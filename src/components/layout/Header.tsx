'use client';

import { OWNER_NAME } from '@/constants/owner-info';
import { ROUTES, ROUTES_KEYS } from '@/constants/routes';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartIcon, LogOutIcon, MoonIcon, Music2Icon, SettingsIcon, SunIcon, UserIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const getLinkClassName = (path: string) => {
    const baseClasses = "relative px-4 py-2 text-base font-medium transition-all duration-300 ease-out";
    const activeClasses = "text-purple-500 dark:text-purple-400";
    const inactiveClasses = "text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const handleLogin = () => {
    signIn('google');
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    setDropdownOpen(false);
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link href={ROUTES[ROUTES_KEYS._HOME]} className="flex items-center space-x-3">
                <Music2Icon className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  {OWNER_NAME}
                </span>
              </Link>
            </motion.div>

            <div className="hidden sm:ml-10 sm:flex sm:space-x-6">
              {[
                { path: ROUTES[ROUTES_KEYS._ABOUT], label: 'About' },
                { path: ROUTES[ROUTES_KEYS._MUSIC], label: 'Music' },
                { path: ROUTES[ROUTES_KEYS._CONTACT], label: 'Contact' }
              ].map((link, i) => (
                <motion.div
                  key={link.path}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href={link.path} className={getLinkClassName(link.path)}>
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <motion.button
              onClick={toggleTheme}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <SunIcon className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-6 w-6 text-purple-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link 
                href={isLoggedIn ? "/favorites" : "/auth/signin"}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <HeartIcon className="h-6 w-6 text-pink-500" />
              </Link>
            </motion.div>

            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={isLoggedIn ? () => setDropdownOpen(!dropdownOpen) : handleLogin}
                className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-hidden"
              >
                {isLoggedIn && session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    width={28} 
                    height={28} 
                    className="rounded-full ring-2 ring-purple-500"
                  />
                ) : (
                  <UserIcon className="h-6 w-6 text-purple-500" />
                )}
              </button>

              <AnimatePresence>
                {isLoggedIn && dropdownOpen && (
                  <motion.div 
                    className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50 border border-purple-500/20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-base text-gray-700 dark:text-gray-200 font-medium truncate">
                        {session?.user?.name || "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {session?.user?.email || ""}
                      </p>
                    </div>
                    <Link 
                      href="/profile/edit" 
                      className="block px-5 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="flex items-center">
                        <SettingsIcon className="mr-3 h-5 w-5" />
                        Edit Profile
                      </span>
                    </Link>
                    <Link 
                      href="/favorites" 
                      className="block px-5 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="flex items-center">
                        <HeartIcon className="mr-3 h-5 w-5" />
                        Favorites
                      </span>
                    </Link>
                    <button 
                      className="w-full text-left block px-5 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={handleLogout}
                    >
                      <span className="flex items-center">
                        <LogOutIcon className="mr-3 h-5 w-5" />
                        Logout
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 