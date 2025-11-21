# 🎨 iOS Starter Template

> Modern React Native iOS app with glassmorphism UI, Font Awesome icons, and GitHub API integration.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-green)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-black)](https://expo.dev/)
[![Tests](https://img.shields.io/badge/tests-17%20passing-brightgreen)](./TEST_REPORT.md)

---

## ✨ Features

### 🎨 Modern UI

- **Glassmorphism design** with transparent cards
- **Colorful Font Awesome icons** with gradient backgrounds
- **8 animated particles** floating across screen
- **Dark theme** optimized for iOS
- **Smooth animations** using React Native Animated API

### 📊 GitHub Stats Page

- Real-time repository statistics
- Beautiful icon backgrounds (gold, purple, cyan, green, orange, pink)
- Auto-fetch from GitHub API
- Error handling with retry

### 🛠️ Developer Experience

- **TypeScript** strict mode
- **Expo Router** file-based navigation
- **Font Awesome** solid icons
- **ESLint + Prettier** configured
- **17 unit tests** - all passing
- **Husky** pre-commit hooks

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/k1rta/ios-starter-template.git
cd ios-starter-template
npm install --legacy-peer-deps

# Start development
npm start

# Press 'i' to open iOS simulator
```

---

## 📱 Pages

### Home Screen (`/`)

- Large mobile icon with glow effect
- App title and description
- Coverage/Version/Platform stats
- 3 action buttons

### Stats Screen (`/stats`)

- 6 colorful stat cards:
  - ⭐ **Stars** (gold)
  - 🔱 **Forks** (purple)
  - 👁️ **Watchers** (cyan)
  - 💾 **Size** (green)
  - ⚠️ **Issues** (orange)
  - 🕐 **Last Updated** (pink)

---

## 🎨 Icon Colors

Each stat has a unique festive color:

- Gold (`#FFD700`) - Stars
- Purple (`#8A2BE2`) - Forks
- Cyan (`#00E5FF`) - Watchers
- Lime (`#32CD32`) - Size
- Orange-Red (`#FF4500`) - Issues
- Hot Pink (`#FF69B4`) - Last Updated

---

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

**Current Status**: ✅ **17/17 tests passing**

See [TEST_REPORT.md](./TEST_REPORT.md) for detailed results.

---

## 📂 Project Structure

```
ios-starter-template/
├── app/
│   ├── index.tsx          # Home screen
│   ├── stats.tsx          # GitHub stats page
│   └── _layout.tsx        # Root layout
├── components/
│   └── welcome-screen/    # Reusable welcome component
├── constants/
│   ├── colors.ts          # Color palette
│   └── spacing.ts         # Spacing scale
├── utils/
│   └── index.ts           # Utility functions
├── __tests__/
│   └── unit/              # Unit tests (17 tests)
└── package.json
```

---

## 🎯 Customization

### Update GitHub Repo

Edit `app/stats.tsx` line 107:

```typescript
'https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO';
```

### Change Colors

Edit `constants/colors.ts`:

```typescript
export const colors = {
  primary: '#00E5FF', // Change theme color
  background: '#0a0f1e', // Change background
  // ...
};
```

### Add New Page

```bash
# Create new file
touch app/new-page.tsx

# Navigate from any page
router.push('/new-page');
```

---

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy without App Store
- [TEST_REPORT.md](./TEST_REPORT.md) - Testing results

---

## 🚢 Production Build

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Run `npm test` to verify
5. Submit pull request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 🙏 Built With

- [Expo](https://expo.dev/) - Universal React apps
- [React Native](https://reactnative.dev/) - Native mobile framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Font Awesome](https://fontawesome.com/) - Icon library
- [GitHub API](https://docs.github.com/en/rest) - Repository stats

---

**Made with ❤️ by [@k1rta](https://github.com/k1rta)**

⭐ Star this repo if you find it useful!
