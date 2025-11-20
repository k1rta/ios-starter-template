# End-to-End (E2E) Testing Guide

E2E tests verify the entire application from a user's perspective on real devices or simulators.

## Recommended Tool: Maestro (iOS-focused)

Maestro is the recommended choice for iOS testing - it's simple, fast, and works great with iOS simulators.

### Install Maestro

```bash
# Install Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Verify installation
maestro --version
```

### Create Your First E2E Test

Create `__tests__/e2e/welcome-flow.yaml`:

```yaml
appId: com.yourcompany.freeiostemplateapp
---
- launchApp
- assertVisible: "Mobile Starter"
- assertVisible: "Modern React Native Template"
- assertVisible: "Get Started"
- tapOn: "Get Started"
- assertVisible: "Initialize"
```

### Run E2E Tests

```bash
# Start iOS simulator first
npm run ios

# Run Maestro test
maestro test __tests__/e2e/welcome-flow.yaml

# Run all E2E tests
maestro test __tests__/e2e/
```

## Alternative: Detox (More Advanced)

If you need more complex testing scenarios:

### Install Detox

```bash
npm install --save-dev detox detox-cli
npx detox init
```

### Configure Detox

Create `.detoxrc.json`:

```json
{
  "testRunner": {
    "args": {
      "$0": "jest",
      "config": "e2e/jest.config.js"
    },
    "jest": {
      "setupTimeout": 120000
    }
  },
  "apps": {
    "ios": {
      "type": "ios.app",
      "build": "xcodebuild -workspace ios/App.xcworkspace -scheme App -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build"
    }
  },
  "devices": {
    "simulator": {
      "type": "ios.simulator",
      "device": {
        "type": "iPhone 15"
      }
    }
  },
  "configurations": {
    "ios": {
      "device": "simulator",
      "app": "ios"
    }
  }
}
```

### Example Detox Test

Create `__tests__/e2e/welcome.e2e.ts`:

```typescript
describe('Welcome Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display welcome screen', async () => {
    await expect(element(by.text('Mobile Starter'))).toBeVisible();
  });

  it('should navigate when button is pressed', async () => {
    await element(by.text('Get Started')).tap();
    // Add assertions for next screen
  });
});
```

## Test Scenarios to Cover

### Critical Paths
- ✅ App launch and welcome screen
- ✅ Primary navigation flows
- ✅ Core user actions

### Optional Paths
- Form validation
- Error handling
- Offline behavior
- Deep linking

## Best Practices

1. **Keep E2E tests minimal** - They're slow and expensive
2. **Test critical user journeys** - Not every feature
3. **Use real user data** - Avoid hardcoded test accounts in production
4. **Run locally before CI** - Catch issues early
5. **Record videos** - Maestro can record test runs

## Running in CI/CD

See `.github/workflows/e2e-tests.yml` for automated E2E testing on GitHub Actions.

## Troubleshooting

### Maestro can't find app
- Ensure app is built: `npm run ios`
- Check appId matches your bundle identifier

### Tests are flaky
- Add explicit waits
- Use retry logic
- Check for animations completing

### Simulator issues
- Reset simulator: `xcrun simctl erase all`
- Restart Simulator.app
