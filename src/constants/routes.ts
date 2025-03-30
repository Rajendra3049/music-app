/**
 * Centralized route management
 * 
 * This file contains all route definitions for the application.
 * Use ROUTES_KEYS when referring to route names and ROUTES for the actual paths.
 */

// Route keys with underscore prefix for naming consistency
export const ROUTES_KEYS = {
  _HOME: '_HOME',
  _INFO: '_INFO',
  _MUSIC: '_MUSIC',
  _CONTACT: '_CONTACT',
  _DOWNLOAD: '_DOWNLOAD',
  _VIDEOS: '_VIDEOS',
  _EVENTS: '_EVENTS',
  _GALLERY: '_GALLERY',
  _ABOUT: '_ABOUT',
} as const;

// Route paths mapped to their respective keys
export const ROUTES = {
  [ROUTES_KEYS._HOME]: '/',
  [ROUTES_KEYS._INFO]: '/info',
  [ROUTES_KEYS._MUSIC]: '/music',
  [ROUTES_KEYS._CONTACT]: '/contact',
  [ROUTES_KEYS._DOWNLOAD]: '/download',
  [ROUTES_KEYS._VIDEOS]: '/videos',
  [ROUTES_KEYS._EVENTS]: '/events',
  [ROUTES_KEYS._GALLERY]: '/gallery',
  [ROUTES_KEYS._ABOUT]: '/about',
} as const;

// Type for route keys
export type RouteKey = keyof typeof ROUTES_KEYS;

// Type for route paths
export type RoutePath = typeof ROUTES[keyof typeof ROUTES]; 