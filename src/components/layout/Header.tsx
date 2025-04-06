'use client';

import { OWNER_NAME } from '@/constants/owner-info';
import { ROUTES, ROUTES_KEYS } from '@/constants/routes';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, Music2Icon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    const activeClasses = "text-purple-500";
    const inactiveClasses = "text-gray-300 hover:text-purple-500";
    
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

  const navigationLinks = [
    { path: ROUTES[ROUTES_KEYS._ABOUT], label: 'About' },
    { path: ROUTES[ROUTES_KEYS._MUSIC], label: 'Music' },
    { path: ROUTES[ROUTES_KEYS._CONTACT], label: 'Contact' }
  ];

  return (
    <motion.nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900/80 backdrop-blur-lg shadow-lg" 
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
                <Music2Icon className="h-8 w-8 md:h-10 md:w-10 text-purple-500" />
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

          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6 text-gray-300" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-gray-900"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute top-0 right-0 p-4">
              <motion.button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XIcon className="h-6 w-6 text-gray-300" />
              </motion.button>
            </div>

            <div className="pt-20 pb-6 px-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block ${getLinkClassName(link.path, true)} ${
                    isActive(link.path)
                      ? "bg-purple-900/20"
                      : "hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
} 