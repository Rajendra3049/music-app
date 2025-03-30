'use client';

import { OWNER_NAME } from '@/constants/owner-info';
import { ROUTES, ROUTES_KEYS } from '@/constants/routes';
import { useTheme } from '@/context/ThemeContext';
import { HeartIcon, LogOutIcon, MoonIcon, SettingsIcon, SunIcon, UserIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getLinkClassName = (path: string) => {
    return isActive(path)
      ? "border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
      : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogin = () => {
    signIn('google');
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={ROUTES[ROUTES_KEYS._HOME]} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {OWNER_NAME}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={ROUTES[ROUTES_KEYS._ABOUT]}
                className={getLinkClassName(ROUTES[ROUTES_KEYS._ABOUT])}
              >
                About
              </Link>
              <Link
                href={ROUTES[ROUTES_KEYS._MUSIC]}
                className={getLinkClassName(ROUTES[ROUTES_KEYS._MUSIC])}
              >
                Music
              </Link>
              <Link
                href={ROUTES[ROUTES_KEYS._GALLERY]}
                className={getLinkClassName(ROUTES[ROUTES_KEYS._GALLERY])}
              >
                Gallery
              </Link>
              <Link
                href={ROUTES[ROUTES_KEYS._CONTACT]}
                className={getLinkClassName(ROUTES[ROUTES_KEYS._CONTACT])}
              >
                Contact
              </Link>
              <Link
                href={ROUTES[ROUTES_KEYS._DOWNLOAD]}
                className={getLinkClassName(ROUTES[ROUTES_KEYS._DOWNLOAD])}
              >
                Download
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            
            {/* Favorites Icon */}
            <Link 
              href={isLoggedIn ? "/favorites" : "/auth/signin"}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Favorites"
            >
              <HeartIcon className="h-5 w-5" />
            </Link>
            
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={isLoggedIn ? toggleDropdown : handleLogin}
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none overflow-hidden"
                aria-label="User profile"
              >
                {isLoggedIn && session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || "User"} 
                    width={20} 
                    height={20} 
                    className="rounded-full"
                  />
                ) : (
                  <UserIcon className="h-5 w-5" />
                )}
              </button>
              
              {/* Dropdown Menu for logged in users */}
              {isLoggedIn && dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-medium truncate">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {session?.user?.email || ""}
                    </p>
                  </div>
                  <Link 
                    href="/profile/edit" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="flex items-center">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Edit Profile
                    </span>
                  </Link>
                  <Link 
                    href="/favorites" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="flex items-center">
                      <HeartIcon className="mr-2 h-4 w-4" />
                      Favorites
                    </span>
                  </Link>
                  <button 
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleLogout}
                  >
                    <span className="flex items-center">
                      <LogOutIcon className="mr-2 h-4 w-4" />
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 