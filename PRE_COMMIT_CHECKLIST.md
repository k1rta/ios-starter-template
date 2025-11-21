# ✅ Pre-Commit Checklist

Run through this checklist before committing code to ensure quality and consistency.

---

## 🔍 Code Quality Checks

### 1. **Run Linter**

```bash
npm run lint
```

**✅ Expected:** No errors  
**❌ If errors:** Fix all linting issues before committing

---

### 2. **Check Code Formatting**

```bash
npx prettier --check .
```

**✅ Expected:** "All matched files use Prettier code style!"  
**❌ If errors:** Run `npx prettier --write .` to auto-fix

---

### 3. **Run Tests**

```bash
npm test
```

**✅ Expected:** All tests pass  
**❌ If failing:** Fix tests or update them if changes are intentional

---

### 4. **Type Check (TypeScript)**

```bash
npx tsc --noEmit
```

**✅ Expected:** No type errors  
**❌ If errors:** Fix TypeScript type issues

---

## 📝 Documentation Checks

### 5. **Update README if Needed**

- [ ] Added new features documented?
- [ ] Dependencies updated in README?
- [ ] Installation steps still accurate?
- [ ] Test count accurate?

---

### 6. **Check for Broken Links**

- [ ] No references to deleted files
- [ ] All documentation links work
- [ ] No dead external URLs

---

## 🧪 Manual Testing

### 7. **Test Core Functionality**

- [ ] App starts without errors
- [ ] Navigation works (homepage ↔ stats)
- [ ] Particles animate properly
- [ ] All buttons work
- [ ] No console errors

---

### 8. **Test on Device/Simulator**

```bash
npx expo start --clear
```

- [ ] Test on iOS simulator OR
- [ ] Test on physical device via Expo Go
- [ ] Verify UI looks correct
- [ ] Check animations work smoothly

---

## 🎯 Commit Message Check

### 9. **Write Good Commit Message**

Format: `type: description`

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style/formatting
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Build process, dependencies

**Examples:**

```
feat: add deployment guide button to homepage
fix: particle animations now restart after navigation
docs: update README with accurate test count
style: fix prettier formatting in components
```

---

## 🚀 Final Steps

### 10. **Stage and Commit**

```bash
# Check what will be committed
git status

# Stage files
git add .

# Or stage specific files
git add path/to/file

# Commit with message
git commit -m "type: description"

# Push to remote
git push
```

---

## 🔄 Quick Checklist

Before every commit, run:

```bash
npm run lint && npx prettier --check . && npm test && npx tsc --noEmit
```

**All green? You're ready to commit!** ✅

---

## 📌 Pro Tips

1. **Use Husky** - Pre-commit hooks run these checks automatically
2. **Commit Often** - Small, focused commits are easier to review
3. **Test Before Push** - Always test major changes in the app
4. **Keep it Clean** - Remove console.logs and debug code
5. **Update Docs** - Documentation is as important as code

---

**Remember:** Quality over speed! Taking a few minutes to check prevents hours of debugging later. 🎯
