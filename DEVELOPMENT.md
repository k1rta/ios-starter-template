# Development Guide

Complete guide for developing with this React Native template.

## Table of Contents

- [System Architecture](#system-architecture)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Component Development](#component-development)
- [Testing Strategy](#testing-strategy)
- [CI/CD Pipeline](#cicd-pipeline)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## System Architecture

### Technology Stack

- **Framework**: React Native 0.81.5 with Expo 54
- **Language**: TypeScript 5.4
- **Routing**: Expo Router 6.0 (file-based)
- **Testing**: Jest + React Native Testing Library
- **Code Quality**: ESLint + Prettier + Husky
- **CI/CD**: GitHub Actions
- **Platforms**: iOS

### Architecture Layers

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Screens, Components, UI Logic)    │
├─────────────────────────────────────┤
│         Business Logic Layer        │
│    (Hooks, Utils, State Mgmt)       │
├─────────────────────────────────────┤
│          Data Layer                 │
│   (API Calls, Local Storage)        │
├─────────────────────────────────────┤
│       Platform Layer                │
│  (React Native, Expo Modules)       │
└─────────────────────────────────────┘
```

### File-Based Routing

Expo Router uses the file system for navigation:

```
app/
├── _layout.tsx          → Root layout
├── index.tsx            → / route
├── dashboard.tsx        → /dashboard route
├── settings/
│   ├── _layout.tsx      → Settings layout
│   ├── index.tsx        → /settings route
│   └── profile.tsx      → /settings/profile route
└── [id].tsx             → /123 dynamic route
```

## Development Setup

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Xcode**: 14+ (for iOS development on Mac)
- **Android Studio**: Latest (for Android development)
- **Expo Go**: Mobile app for testing

### Initial Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd free-mobile-app-template

# Install dependencies
npm install

# Start development server
npm start
```

### Platform-Specific Setup

#### iOS (macOS only)

```bash
# Install CocoaPods
sudo gem install cocoapods

# Run on iOS Simulator
npm run ios
```

### Environment Configuration

Create `.env` file for environment variables:

```env
API_URL=https://api.example.com
API_KEY=your_api_key_here
```

Access in code:

```tsx
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;
```

## Project Structure

```
free-mobile-app-template/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with providers
│   └── index.tsx                # Home/Welcome screen
├── components/                   # Reusable UI components
│   ├── Button/
│   │   └── Button.tsx           # Button component
│   ├── Card/
│   │   └── Card.tsx             # Card component
│   ├── Input/
│   │   └── Input.tsx            # Input component
│   ├── welcome-screen/
│   │   └── welcome-screen.tsx   # Welcome screen component
│   └── index.ts                 # Component exports
├── constants/                    # App-wide constants
│   ├── colors.ts                # Color palette
│   └── spacing.ts               # Spacing scale
├── utils/                        # Utility functions
│   └── index.ts                 # Helper functions
├── __tests__/                    # Test files
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   ├── e2e/                     # E2E tests
│   └── welcome-screen.test.tsx  # Component tests
├── __mocks__/                    # Jest mocks
├── .github/                      # GitHub configuration
│   ├── workflows/               # CI/CD workflows
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/                       # Git hooks
├── package.json                  # Dependencies & config
├── tsconfig.json                 # TypeScript config
├── babel.config.js              # Babel config
├── metro.config.js              # Metro bundler config
├── README.md                     # User documentation
├── DEVELOPMENT.md               # This file
└── PLATFORM_CONFIG.md           # Platform configuration
```

## Component Development

### Creating a New Component

1. **Create component directory**:

```bash
mkdir components/MyComponent
```

2. **Create component file**:

```tsx
// components/MyComponent/MyComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
  },
});
```

3. **Export from index**:

```tsx
// components/index.ts
export { MyComponent } from './MyComponent/MyComponent';
```

4. **Create tests**:

```tsx
// __tests__/unit/MyComponent.test.tsx
import { render } from '@testing-library/react-native';
import { MyComponent } from '@/components';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    const { getByText } = render(<MyComponent title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });
});
```

### Using Reusable Components

```tsx
import { Button, Card, Input } from '@/components';

function MyScreen() {
  return (
    <Card elevated>
      <Input label="Email" placeholder="Enter email" error={error} />
      <Button title="Submit" variant="primary" onPress={handleSubmit} />
    </Card>
  );
}
```

## Testing Strategy

### Test Layers

#### 1. Unit Tests (`__tests__/unit/`)

Test individual functions and components in isolation.

```tsx
// Test constants
describe('Colors', () => {
  it('should have valid hex colors', () => {
    expect(colors.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });
});
```

#### 2. Integration Tests (`__tests__/integration/`)

Test component interactions and data flow.

```tsx
// Test user flows
describe('Login Flow', () => {
  it('should navigate to dashboard after login', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });
});
```

#### 3. E2E Tests (`__tests__/e2e/`)

Test complete user journeys (requires Detox or Maestro).

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- MyComponent.test.tsx

# Watch mode
npm test -- --watch

# Update snapshots
npm test -- -u
```

### Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Main user journeys

## CI/CD Pipeline

### GitHub Actions Workflows

#### 1. CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and PR:

- Linting
- Type checking
- Unit & integration tests
- Build validation

#### 2. PR Checks (`.github/workflows/pr-checks.yml`)

Additional PR validation:

- Changed file linting
- Related tests
- Bundle size check
- Automated comments

### Setting Up CI/CD

1. **Add GitHub Secrets**:
   - `EXPO_TOKEN`: Get from `npx expo login`
   - `CODECOV_TOKEN`: From codecov.io (optional)

2. **Enable GitHub Actions**:
   - Go to repository Settings → Actions
   - Enable workflows

3. **Configure Branch Protection**:
   - Require PR reviews
   - Require status checks to pass
   - Require branches to be up to date

### Deployment

#### Development Builds

```bash
# Build for testing
npx expo build:ios --type simulator
npx expo build:android --type apk
```

#### Production Builds with EAS

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform ios
eas build --platform android
eas build --platform all
```

## Best Practices

### Code Style

- Use TypeScript for all new files
- Follow ESLint rules
- Use Prettier for formatting
- Write descriptive variable names
- Add JSDoc comments for complex functions

### Component Guidelines

- Keep components small and focused
- Use functional components with hooks
- Extract reusable logic into custom hooks
- Use TypeScript interfaces for props
- Implement proper error boundaries

### State Management

- Use React hooks for local state
- Consider Zustand/Redux for global state
- Keep state as close to usage as possible
- Avoid prop drilling with context

### Performance

- Use `React.memo` for expensive components
- Implement `useMemo` and `useCallback` appropriately
- Optimize FlatList with proper keys and memoization
- Use Hermes engine for better performance
- Profile with React DevTools

### Accessibility

- Add `accessibilityLabel` to interactive elements
- Use semantic HTML on web
- Test with screen readers
- Ensure sufficient color contrast
- Support dynamic font sizes

## Troubleshooting

### Common Issues

#### Metro Bundler Issues

```bash
# Clear cache
npx expo start --clear

# Reset Metro
watchman watch-del-all
rm -rf node_modules
npm install
```

#### iOS Build Errors

```bash
# Clean iOS build
cd ios && pod deintegrate && pod install && cd ..
npx expo run:ios --clean
```

#### Type Errors

```bash
# Regenerate types
npx expo customize tsconfig.json
```

### Getting Help

- **Expo Documentation**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **GitHub Issues**: Create an issue in the repository
- **Stack Overflow**: Tag with `expo` and `react-native`

## Development Workflow

### Feature Development

1. Create feature branch: `git checkout -b feature/my-feature`
2. Implement feature with tests
3. Run tests: `npm test`
4. Lint code: `npm run lint`
5. Commit with descriptive message
6. Push and create PR
7. Address review feedback
8. Merge after approval

### Git Hooks

Pre-commit hooks (via Husky):

- Lint staged files
- Format with Prettier
- Run affected tests

### Code Review Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.logs left
- [ ] TypeScript types correct
- [ ] Performance considered
- [ ] Accessibility implemented
- [ ] Error handling added
- [ ] Code follows style guide

## Next Steps

- Add authentication (Firebase, Auth0, etc.)
- Implement state management (Zustand, Redux)
- Add API integration layer
- Set up error tracking (Sentry)
- Add analytics (Segment, Amplitude)
- Implement push notifications
- Add offline support
- Create design system documentation

---

**Happy developing! 🚀**
