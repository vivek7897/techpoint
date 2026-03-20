/**
 * Constants for TechKnowldge Platform
 * Centralized configuration and constant values
 */

// API Endpoints (for future backend integration)
export const API_BASE_URL = "https://api.techknowldge.com";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  USER_PROFILE: "/user/profile",
  COURSES: "/courses",
  PROGRESS: "/user/progress",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: "techknowldge_user",
  TOKEN: "techknowldge_token",
  THEME: "techknowldge_theme",
  PROGRESS: "techknowldge_progress",
  BOOKMARKS: "techknowldge_bookmarks",
};

// Course Configuration
export const COURSES = {
  HTML: {
    id: "html",
    name: "HTML Tutorial",
    lessons: 18,
    level: "beginner",
    icon: "fa-html5",
    color: "#e34c26",
  },
  CSS: {
    id: "css",
    name: "CSS Tutorial",
    lessons: 22,
    level: "beginner",
    icon: "fa-css3-alt",
    color: "#264de4",
  },
  JAVASCRIPT: {
    id: "javascript",
    name: "JavaScript Tutorial",
    lessons: 30,
    level: "intermediate",
    icon: "fa-js",
    color: "#f0db4f",
  },
  REACT: {
    id: "react",
    name: "React Tutorial",
    lessons: 25,
    level: "advanced",
    icon: "fa-react",
    color: "#61dafb",
  },
};

// Difficulty Levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
};

// Theme Options
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

// Navigation Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/src/pages/auth/login.html",
  REGISTER: "/src/pages/auth/register.html",
  DASHBOARD: "/src/pages/dashboard/dashboard.html",
  CERTIFICATES: "/src/pages/certificates/certificates.html",
  HTML_COURSE: "/src/courses/html/html-course.html",
  CSS_COURSE: "/src/courses/css/css-course.html",
  JS_COURSE: "/src/courses/javascript/js-course.html",
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD: "Password must be at least 8 characters",
  LOGIN_FAILED: "Invalid email or password",
  NETWORK_ERROR: "Network error. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful!",
  LOGOUT_SUCCESS: "Logged out successfully",
  PROGRESS_SAVED: "Progress saved successfully",
};
