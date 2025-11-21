# Adding New Pages to Your iOS App

Complete guide for adding new screens and navigation to your app.

## Quick Start

Adding a new page takes **3 simple steps**:

1. Create a file in `app/` directory
2. Write your component
3. Navigate to it

That's it! Expo Router handles routing automatically based on file structure.

---

## File-Based Routing

Expo Router uses your file structure to create routes:

```
app/
├── index.tsx           → / (home screen)
├── dashboard.tsx       → /dashboard
├── profile.tsx         → /profile
├── settings/
│   ├── index.tsx      → /settings
│   ├── account.tsx    → /settings/account
│   └── privacy.tsx    → /settings/privacy
└── [id].tsx           → /123 (dynamic route)
```

---

## Example 1: Simple Page

### Step 1: Create File

Create `app/dashboard.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.description}>
          Welcome to your dashboard!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
```

### Step 2: Navigate to It

Update `app/index.tsx` (or any component):

```typescript
import { router } from 'expo-router';

const handleGetStarted = () => {
  router.push('/dashboard');
};

// In your component:
<Button title="Get Started" onPress={handleGetStarted} />
```

**That's it!** Your new page is ready. 🎉

---

## Example 2: Page with Navigation Bar

### Create `app/profile.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john@example.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  placeholder: {
    width: 50, // Balance the header
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
```

---

## Example 3: Nested Routes (Settings Section)

### Create folder structure:

```bash
mkdir app/settings
touch app/settings/index.tsx
touch app/settings/account.tsx
touch app/settings/privacy.tsx
```

### `app/settings/index.tsx` (Main settings page):

```typescript
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function Settings() {
  const settings = [
    { label: 'Account', route: '/settings/account' },
    { label: 'Privacy', route: '/settings/privacy' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {settings.map((setting) => (
        <Pressable
          key={setting.route}
          style={styles.item}
          onPress={() => router.push(setting.route)}
        >
          <Text style={styles.itemText}>{setting.label}</Text>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 18,
    color: colors.textSecondary,
  },
});
```

### `app/settings/account.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Account Settings</Text>
      <Text style={styles.description}>Manage your account here</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
```

---

## Example 4: Dynamic Routes

For pages like `/user/123` or `/post/abc`:

### Create `app/user/[id].tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function User() {
  // Get the dynamic parameter
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.userId}>ID: {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  userId: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
```

Navigate to it:

```typescript
router.push(`/user/${userId}`);
// Example: router.push('/user/123')
```

---

## Navigation Methods

### Push (Navigate forward)

```typescript
import { router } from 'expo-router';

router.push('/dashboard');
router.push('/user/123');
router.push({ pathname: '/profile', params: { name: 'John' } });
```

### Replace (Replace current screen)

```typescript
router.replace('/dashboard'); // Can't go back
```

### Back (Go back)

```typescript
router.back();
```

### Navigate with parameters

```typescript
router.push({
  pathname: '/details',
  params: { id: '123', name: 'Product' },
});

// Access params in details page:
const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
```

---

## Layouts

Create layouts to share UI across multiple pages:

### `app/settings/_layout.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, Slot } from 'expo-router';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export default function SettingsLayout() {
  return (
    <View style={styles.container}>
      {/* Shared header for all settings pages */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Child pages render here */}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '600',
    marginRight: spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
```

---

## Best Practices

### ✅ DO

- Use `SafeAreaView` for proper iOS safe area handling
- Import and use color/spacing constants
- Add TypeScript types for params
- Keep pages focused on single responsibility
- Use layouts for shared UI

### ❌ DON'T

- Hardcode colors or spacing values
- Create deeply nested folder structures (max 2-3 levels)
- Put business logic directly in pages (create hooks/utils)
- Use default exports without naming them

---

## Testing New Pages

Create a test file for your page:

```typescript
// __tests__/pages/dashboard.test.tsx
import { render } from '@testing-library/react-native';
import Dashboard from '@/app/dashboard';

describe('Dashboard Page', () => {
  it('renders dashboard title', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeTruthy();
  });
});
```

---

## Common Patterns

### Loading State

```typescript
const [loading, setLoading] = useState(true);

if (loading) {
  return <ActivityIndicator size="large" color={colors.accent} />;
}
```

### Error Handling

```typescript
const [error, setError] = useState<string | null>(null);

if (error) {
  return <Text style={styles.error}>{error}</Text>;
}
```

### Data Fetching

```typescript
useEffect(() => {
  async function fetchData() {
    try {
      const data = await api.getData();
      setData(data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }
  fetchData();
}, []);
```

---

## Next Steps

1. Create your first page
2. Add navigation
3. Test on iOS simulator
4. Add tests
5. Deploy!

**Happy coding!** 🚀
