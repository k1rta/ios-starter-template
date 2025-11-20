# GitHub Repository Setup Guide

Complete guide for setting up your iOS app template repository on GitHub.

## 1. Repository Name

**Current**: `free-ios-app-creation-template`

**Recommendations**:
- ✅ **`ios-starter-template`** - Short, clear, professional
- ✅ **`react-native-ios-template`** - Descriptive, SEO-friendly
- ✅ **`expo-ios-starter`** - Shows tech stack clearly
- ⚠️ `free-ios-app-creation-template` - A bit long but descriptive

**Chosen**: The current name is fine, but consider shortening to `ios-starter-template` for simplicity.

---

## 2. Create Repository

### Option A: GitHub CLI

```bash
# Install GitHub CLI if you haven't
brew install gh

# Authenticate
gh auth login

# Create repository
cd /Users/kirta-linda.karits/Desktop/free-mobile-app-template
gh repo create free-ios-app-creation-template --public --source=. --remote=origin

# Push code
git add .
git commit -m "Initial commit: Production-ready iOS template"
git push -u origin main
```

### Option B: GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `free-ios-app-creation-template`
3. Description: "Production-ready React Native iOS template with Expo, TypeScript, and comprehensive testing"
4. Choose **Public**
5. **Don't** initialize with README (we already have one)
6. Create repository

Then push your code:

```bash
cd /Users/kirta-linda.karits/Desktop/free-mobile-app-template
git init
git add .
git commit -m "Initial commit: Production-ready iOS template"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/free-ios-app-creation-template.git
git push -u origin main
```

---

## 3. Repository Settings

### Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Set **Actions permissions**: "Allow all actions and reusable workflows"
3. Set **Workflow permissions**: "Read and write permissions"
4. Check ✅ "Allow GitHub Actions to create and approve pull requests"

### Branch Protection

1. Go to **Settings** → **Branches**
2. Add rule for `main` branch:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - Select: `test`, `lint` (these come from CI workflow)
   - ✅ Require branches to be up to date before merging

### Secrets Configuration

Go to **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

#### Required Secrets

**`EXPO_TOKEN`** (Required for CI/CD builds)
```bash
# Generate token
npx expo login
npx expo whoami --token

# Copy the token and add it as a GitHub secret
```

#### Optional Secrets (for production builds)

**`APPLE_ID`** - Your Apple ID email  
**`APPLE_APP_SPECIFIC_PASSWORD`** - Generate at appleid.apple.com  
**`APPLE_TEAM_ID`** - Found in Apple Developer Portal  

---

## 4. Repository Topics

Add these topics to help users find your template:

```
ios, react-native, expo, typescript, template, 
starter, boilerplate, mobile-app, ios-development
```

Go to **About** (top right) → **⚙️ Settings** → Add topics

---

## 5. README Badge Setup

Your README already has badges. Ensure GitHub Actions workflow matches:

```markdown
[![CI](https://github.com/k1rta/free-ios-app-creation-template/workflows/CI/badge.svg)](https://github.com/k1rta/free-ios-app-creation-template/actions)
```

Update `YOUR_USERNAME` with your actual GitHub username.

---

## 6. GitHub Template Settings

Make your repository a template so others can use it:

1. Go to **Settings**
2. Check ✅ **Template repository**
3. Users can now click "Use this template" to create their own copy

---

## 7. Set Up CI/CD Workflow

The template already includes `.github/workflows/ci.yml`. Verify it's set up correctly:

### Test the Workflow

1. Make a small change and commit:
   ```bash
   git add .
   git commit -m "Test CI workflow"
   git push
   ```

2. Go to **Actions** tab on GitHub
3. You should see the workflow running
4. Ensure all checks pass ✅

### Expected Workflow Jobs

- **Install dependencies**
- **Run linter** (ESLint, Prettier)
- **Run tests** (Jest)
- **Type check** (TypeScript)
- **Build iOS** (optional, requires EAS secrets)

---

## 8. Create Release

### First Release

```bash
# Tag the version
git tag -a v1.0.0 -m "Initial production release"
git push origin v1.0.0
```

### GitHub Release

1. Go to **Releases** → **Create a new release**
2. Tag: `v1.0.0`
3. Title: `v1.0.0 - Initial Release`
4. Description:
   ```markdown
   ## 🎉 Initial Release
   
   A production-ready iOS app template with:
   
   - ✨ Modern UI with clean design
   - 🧪 Comprehensive testing (Unit, Integration, E2E)
   - 🚀 CI/CD with GitHub Actions
   - 📱 iOS-optimized
   - 🔧 TypeScript, ESLint, Prettier
   - 📚 Complete documentation
   
   ## Getting Started
   
   See [README.md](README.md) for installation and usage.
   ```

---

## 9. Issue Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - Device: [e.g. iPhone 15]
 - iOS Version: [e.g. 17.0]
 - App Version: [e.g. 1.0.0]
```

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature request
about: Suggest an idea for this template
title: '[FEATURE] '
labels: enhancement
assignees: ''
---

**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
What you want to happen.

**Additional context**
Any other context or screenshots.
```

---

## 10. Documentation

Ensure these files are up to date:

- ✅ `README.md` - Main documentation
- ✅ `DEVELOPMENT.md` - Development guide
- ✅ `PLATFORM_CONFIG.md` - Platform configuration
- ✅ `USAGE.md` - Usage examples
- ✅ `GITHUB_SETUP.md` - This file
- ✅ `__tests__/README.md` - Test documentation

---

## 11. Expo Account Setup

To use EAS for builds, you need an Expo account:

```bash
# Create account or login
npx expo login

# Initialize EAS
npx eas init

# Configure builds
npx eas build:configure
```

This will create/update `eas.json` with your project settings.

---

## 12. App Store Connect Setup

For production releases:

1. **Apple Developer Account** ($99/year)
   - Sign up at https://developer.apple.com

2. **Create App in App Store Connect**
   - Go to https://appstoreconnect.apple.com
   - Create new app
   - Bundle ID must match `com.yourcompany.freeiostemplateapp` (or update in package.json)

3. **Certificates & Provisioning**
   - EAS handles this automatically
   - Or manually create in Apple Developer Portal

---

## 13. Maintenance

### Regular Updates

```bash
# Update dependencies monthly
npm update

# Check for outdated packages
npm outdated

# Update Expo SDK (when new version released)
npx expo upgrade
```

### Security

- Enable **Dependabot** in GitHub Settings → Security
- Review and merge security PRs
- Keep dependencies updated

---

## Quick Checklist

- [ ] Create GitHub repository
- [ ] Enable GitHub Actions
- [ ] Add `EXPO_TOKEN` secret
- [ ] Set up branch protection
- [ ] Make repository a template
- [ ] Add topics for discoverability
- [ ] Create first release (v1.0.0)
- [ ] Test CI/CD workflow
- [ ] Update README badges
- [ ] Add issue templates
- [ ] Set up Expo account
- [ ] Configure EAS builds

---

**You're all set!** 🎉 Your iOS template is now production-ready and GitHub-ready.
