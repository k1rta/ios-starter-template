# 🚀 Deployment Guide

Deploy your iOS app to users **without the App Store**.

## Prerequisites

- ✅ Expo account (free) - Already set up as `k1rta`
- ✅ App configured in `app.json`

---

## Option 1: Expo Go (Easiest & Free) ⭐

Share your app instantly with anyone who has Expo Go installed.

### How It Works

1. Users install **Expo Go** from the App Store
2. You share a link or QR code
3. They open it in Expo Go
4. Your app runs instantly

### Deploy Now

**For Local Network (Same WiFi):**

```bash
cd /Users/kirta-linda.karits/Desktop/ios-starter-template

# Start dev server
npx expo start
```

Anyone on your WiFi can scan the QR code!

**For Internet Access (Public):**

```bash
# First time setup
npx eas update:configure

# Publish your app
npx eas update --branch production --message "First deploy"
```

Share the project URL with anyone worldwide!

**Pros:**

- ✅ Completely free
- ✅ Instant sharing
- ✅ No approval process
- ✅ Share via QR code or link

**Cons:**

- ❌ Users need Expo Go app installed
- ❌ App runs inside Expo Go (not standalone)

---

## Option 2: EAS Update (Modern Publishing)

Share updates to users who have your app.

### Setup

```bash
# Configure EAS Update
npx eas update:configure

# Publish update
npx eas update --branch production --message "Initial release"
```

**Pros:**

- ✅ Modern Expo solution
- ✅ Instant OTA updates
- ✅ Version control

**Cons:**

- ❌ Still requires Expo Go or standalone build
- ❌ Users need the app first

---

## Option 3: EAS Internal Distribution

Build standalone apps without App Store submission.

### Setup

```bash
# Build for internal distribution
npx eas build --platform ios --profile preview
```

After build completes:

1. EAS gives you a download link
2. Share link with testers
3. They install via Safari (adhoc distribution)

**Requirements:**

- Testers' device UDIDs registered
- Maximum 100 devices
- Free with EAS (30 builds/month)

**Pros:**

- ✅ Standalone app (no Expo Go needed)
- ✅ Feels like real app
- ✅ No App Store approval

**Cons:**

- ❌ Need device UDIDs
- ❌ Max 100 devices
- ❌ Must re-register for updates

---

## Recommended Approach

### For Quick Testing (Friends & Family)

**Use Expo Go with Tunnel:**

```bash
npx expo start --tunnel
```

Share the QR code!

### For Beta Testing (Real Users)

**Use EAS Internal Distribution:**

```bash
npx eas build --platform ios --profile preview
```

---

## Quick Commands

```bash
# Check Expo login
npx expo whoami

# Start with tunnel (shareable)
npx expo start --tunnel

# Publish update (modern way)
npx eas update --branch production

# Build standalone (internal)
npx eas build --platform ios --profile preview
```

---

## Cost Comparison

| Method | Cost | Users | Updates |
|--------|------|-------|---------|
| Expo Go (tunnel) | Free | Unlimited | Live |
| EAS Update | Free | Unlimited | Instant |
| EAS Internal Build | Free* | 100 devices | Manual |

\* Free tier: 30 builds/month

---

## Next Steps

1. **Update `app.json`** with your app details
2. **Choose deployment method**
3. **Share with users**
4. **Gather feedback**
5. **Iterate and improve**

---

## No App Store? No Problem! 🎉

You can have a fully functional app without ever touching the App Store.

**Ready to deploy?**

```bash
cd /Users/kirta-linda.karits/Desktop/ios-starter-template
npx expo start --tunnel
```

Share the QR code and you're live! 🚀

---

## Notes

⚠️ **`expo publish` is deprecated** - Use `eas update` instead

⚠️ **Tunnel mode (`--tunnel`)** has known issues - Use local network or EAS Update instead

✅ **Local network sharing** works perfectly for same WiFi users

🚀 **EAS Update** is the modern replacement for `expo publish` and tunnel mode
