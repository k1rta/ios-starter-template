# Platform Configuration Guide

This template supports **iOS** platform.

## Current Configuration

The app is configured to support **iOS** by default:
- ✅ iOS

## Platform-Specific Configuration

### iOS Only

Edit `package.json` expo config:

```json
"expo": {
  "platforms": ["ios"],
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.yourcompany.yourapp"
  }
}
```

## Platform-Specific Code

Use platform checks in your code if you plan to add other platforms later:

```tsx
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  // iOS-specific code
}
```

## Build Commands

### iOS
```bash
# Development
npm run ios

# Production build
npx eas build --platform ios
```

## EAS Build Configuration

For production builds with EAS, create `eas.json`:

```json
{
  "build": {
    "production": {
      "ios": {
        "buildType": "release"
      }
    },
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}
```

## Platform Testing

Test on target platform before release:

```bash
# iOS Simulator
npm run ios

# Physical devices
npx expo start
# Scan QR code with Expo Go app
```
