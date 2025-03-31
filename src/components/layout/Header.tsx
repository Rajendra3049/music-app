'use client';

import { OWNER_NAME } from '@/constants/owner-info';
import { ROUTES, ROUTES_KEYS } from '@/constants/routes';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartIcon, LogOutIcon, MenuIcon, MoonIcon, Music2Icon, SettingsIcon, SunIcon, UserIcon, XIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  const getLinkClassName = (path: string, isMobile = false) => {
    const baseClasses = isMobile
      ? "w-full px-5 py-3 text-base font-medium transition-all duration-300 ease-out"
      : "relative px-4 py-2 text-base font-medium transition-all duration-300 ease-out";
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

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
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

  const navigationLinks = [
    { path: ROUTES[ROUTES_KEYS._ABOUT], label: 'About' },
    { path: ROUTES[ROUTES_KEYS._MUSIC], label: 'Music' },
    { path: ROUTES[ROUTES_KEYS._CONTACT], label: 'Contact' }
  ];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0"
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
            >
              <Link href={ROUTES[ROUTES_KEYS._HOME]} className="flex items-center space-x-2 md:space-x-3">
                <Music2Icon className="h-8 w-8 md:h-10 md:w-10 text-purple-500 dark:text-purple-400" />
                <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  {OWNER_NAME}
                </span>
              </Link>
            </motion.div>

            <div className="hidden md:ml-10 md:flex md:space-x-6">
              {navigationLinks.map((link, i) => (
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

          <div className="flex items-center space-x-2 md:space-x-6">
            <motion.button
              onClick={toggleTheme}
              className="p-2 md:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                    <SunIcon className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                  ) : (
                    <MoonIcon className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:block"
            >
              <Link 
                href={isLoggedIn ? "/favorites" : "/auth/signin"}
                className="inline-flex items-center justify-center"
              >
                <HeartIcon className="h-5 w-5 md:h-6 md:w-6 text-pink-500 hover:text-pink-600 transition-colors" />
              </Link>
            </motion.div>

            <motion.div 
              className="relative hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={isLoggedIn ? () => setDropdownOpen(!dropdownOpen) : handleLogin}
                className="p-2 md:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors overflow-hidden"
              >
                {isLoggedIn && session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    width={24} 
                    height={24} 
                    className="rounded-full ring-2 ring-purple-500 md:w-7 md:h-7"
                  />
                ) : (
                  <UserIcon className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
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

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-y-auto"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="pt-20 pb-6 px-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block ${getLinkClassName(link.path, true)} ${
                    isActive(link.path)
                      ? "bg-purple-50 dark:bg-purple-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="mt-6 px-5">
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center mb-6">
                        {session?.user?.image && (
                          <Image
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            width={40}
                            height={40}
                            className="rounded-full ring-2 ring-purple-500"
                          />
                        )}
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 dark:text-gray-200">
                            {session?.user?.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {session?.user?.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/profile/edit"
                        className="block py-3 text-base text-gray-700 dark:text-gray-200"
                      >
                        <span className="flex items-center">
                          <SettingsIcon className="mr-3 h-5 w-5" />
                          Edit Profile
                        </span>
                      </Link>
                      <Link
                        href="/favorites"
                        className="block py-3 text-base text-gray-700 dark:text-gray-200"
                      >
                        <span className="flex items-center">
                          <HeartIcon className="mr-3 h-5 w-5" />
                          Favorites
                        </span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block py-3 text-base text-gray-700 dark:text-gray-200"
                      >
                        <span className="flex items-center">
                          <LogOutIcon className="mr-3 h-5 w-5" />
                          Logout
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                    >
                      <UserIcon className="mr-2 h-5 w-5" />
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 