/**
 * Centralized test data constants
 * Use these instead of hardcoding values in tests
 */

export const TEST_DATA = {
  // App content
  APP_TITLE: 'iOS Starter',
  APP_SUBTITLE: 'React Native • Expo • TypeScript',
  APP_DESCRIPTION: 'A modern, production-ready template to kickstart your next iOS app. Built with best practices and ready to ship.',
  APP_BADGE: '⚡ SYSTEM ONLINE',
  
  // Button labels
  BUTTON_PRIMARY: 'View Repository',
  BUTTON_SECONDARY: 'Read Docs',
  BUTTON_TERTIARY: 'Settings',
  
  // Stats
  STAT_COVERAGE: '100%',
  STAT_VERSION: 'v1.0',
  STAT_PLATFORM: 'iOS',
  
  // User inputs
  SAMPLE_EMAIL: 'test@example.com',
  SAMPLE_PASSWORD: 'SecurePass123!',
  SAMPLE_USERNAME: 'testuser',
  
  // API mock responses
  MOCK_USER: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  },
  
  // Error messages
  ERROR_NETWORK: 'Network request failed',
  ERROR_INVALID_EMAIL: 'Invalid email format',
  ERROR_REQUIRED_FIELD: 'This field is required',
} as const;

export const TEST_IDS = {
  // Screen identifiers
  WELCOME_SCREEN_ROOT: 'welcome-screen-root',
  HOME_SCREEN: 'home-screen',
  
  // Welcome screen elements
  WELCOME_TITLE: 'welcome-title',
  WELCOME_SUBTITLE: 'welcome-subtitle',
  WELCOME_DESCRIPTION: 'welcome-description',
  STATUS_BADGE: 'status-badge',
  
  // Action buttons
  PRIMARY_ACTION_BUTTON: 'primary-action-button',
  SECONDARY_ACTION_BUTTON: 'secondary-action-button',
  TERTIARY_ACTION_BUTTON: 'tertiary-action-button',
  
  // Stats container
  STATS_CONTAINER: 'stats-container',
  STAT_COVERAGE_VALUE: 'stat-coverage-value',
  STAT_VERSION_VALUE: 'stat-version-value',
  STAT_PLATFORM_VALUE: 'stat-platform-value',
  
  // Input fields
  EMAIL_INPUT: 'email-input',
  PASSWORD_INPUT: 'password-input',
} as const;
