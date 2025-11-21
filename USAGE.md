# Quick Start Guide

## Testing the Buttons Right Now

When you run the app, press each button to see console output:

1. **Initialize** → Logs: `🚀 Initialize: Starting main app experience`
2. **Configure** → Logs: `⚙️ Configure: Opening settings`
3. **Docs** → Logs: `📚 Documentation: Opening help resources`

Open the developer console to see these logs:

- **iOS/Android**: Shake device → "Debug" → "Show Element Inspector"
- **Expo Go**: Shake device → "Debug Remote JS"
- **Terminal**: Logs appear in the terminal where you ran `npx expo start`

## Making the Buttons Actually Work

### Step 1: Create New Screens

Create files in the `app/` directory for your screens:

```bash
# Example: Create a dashboard screen
touch app/dashboard.tsx

# Example: Create a settings screen
touch app/settings.tsx
```

**Example `app/dashboard.tsx`:**

```tsx
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome to your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
```

### Step 2: Wire Up Navigation

Update `app/index.tsx` to navigate to your new screens:

```tsx
import { router } from 'expo-router';

const handleInitialize = () => {
  // Navigate to dashboard
  router.push('/dashboard');
};

const handleConfigure = () => {
  // Navigate to settings
  router.push('/settings');
};
```

### Step 3: Test It

1. Save your changes
2. The app will hot-reload
3. Press the buttons to navigate between screens

## Common Patterns

### Pattern 1: Onboarding Flow

Use the welcome screen as an onboarding screen:

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const handleInitialize = async () => {
  // Mark onboarding as complete
  await AsyncStorage.setItem('onboardingComplete', 'true');

  // Navigate to main app
  router.replace('/dashboard');
};
```

### Pattern 2: External Links

Open documentation in a browser:

```tsx
import { Linking } from 'react-native';

const handleDocumentation = () => {
  Linking.openURL('https://docs.yourapp.com');
};
```

### Pattern 3: Modal/Sheet

Show a configuration modal:

```tsx
import { useState } from 'react';

const [showConfig, setShowConfig] = useState(false);

const handleConfigure = () => {
  setShowConfig(true);
};

// In your JSX:
{
  showConfig && <ConfigModal onClose={() => setShowConfig(false)} />;
}
```

## Customizing the Welcome Screen

### Change the Text

```tsx
<WelcomeScreen
  badgeText="READY" // Top badge
  title="My Awesome App" // Main title
  subtitle="Tagline Here" // Cyan subtitle
  description="Longer description of what your app does..."
  primaryActionLabel="Start" // Button text
  secondaryActionLabel="Setup"
  tertiaryActionLabel="Help"
/>
```

### Hide Buttons You Don't Need

Simply don't pass the handler:

```tsx
<WelcomeScreen
  title="My App"
  primaryActionLabel="Get Started"
  onPrimaryActionPress={handleStart}
  // No secondary or tertiary buttons
/>
```

### Change Button Order

The buttons are always rendered in this order:

1. Primary (full width)
2. Secondary + Tertiary (side by side)

To change this, modify `components/welcome-screen/welcome-screen.tsx`.

## File Cleanup

### Safe to Delete

If you don't need these, you can remove them:

```bash
# Remove placeholder utility file
rm utils/index.ts

# Remove utils directory if empty
rmdir utils

# Remove Husky if you don't want pre-commit hooks
rm -rf .husky
npm uninstall husky
# Then remove "prepare": "husky install" from package.json scripts
```

### Keep These

- `app/` - Required for Expo Router
- `components/` - Your UI components
- `constants/` - Theme values
- All config files (tsconfig.json, babel.config.js, etc.)

## Troubleshooting

### "Cannot find module '@/components/...'"

Make sure `tsconfig.json` has the path mappings:

```json
"paths": {
  "@/components/*": ["components/*"],
  "@/constants/*": ["constants/*"]
}
```

### Buttons Don't Navigate

1. Make sure you imported `router` from `expo-router`
2. Check that your screen file exists in `app/`
3. Check the terminal for errors

### App Crashes on Button Press

Check the terminal/console for error messages. Common issues:

- Typo in route path
- Missing screen file
- Async function not awaited

## Next Steps

1. ✅ Test the buttons (see console logs)
2. ✅ Create your first screen (`app/dashboard.tsx`)
3. ✅ Wire up navigation in `app/index.tsx`
4. ✅ Customize colors in `constants/colors.ts`
5. ✅ Add more screens as needed
6. ✅ Build your app! 🚀

---

**Need help?** Check the main [README.md](./README.md) for detailed documentation.
