# Testing Documentation

Simple, focused unit tests for utilities and constants.

## 📁 Structure

```
__tests__/
├── unit/                  # Unit tests
│   ├── colors.test.ts    # Color constants validation
│   ├── spacing.test.ts   # Spacing constants validation
│   └── utils.test.ts     # Utility functions
└── e2e/                  # E2E test setup (optional)
```

## 🧪 Unit Tests

### What We Test

**Constants** (`colors.test.ts`, `spacing.test.ts`)
- Validate all required properties exist
- Check correct value types (hex, rgba, numbers)
- Verify color/spacing values are valid

**Utilities** (`utils.test.ts`)
- Pure function behavior
- Edge cases (empty strings, etc.)
- Return value correctness

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm test -- --watch

# Coverage report
npm test -- --coverage

# Run specific file
npm test colors.test.ts
```

## ✅ Current Tests

- **9 unit tests** covering:
  - ✅ Color constants (8 tests)
  - ✅ Spacing constants (2 tests)  
  - ✅ Utility functions (3 tests)

## 📝 Adding New Tests

Create tests in `__tests__/unit/` following this pattern:

```typescript
import { myFunction } from '@/utils';

describe('myFunction', () => {
  it('does something', () => {
    expect(myFunction('input')).toBe('expected');
  });
});
```

## �� Best Practices

- ✅ Test behavior, not implementation
- ✅ Use descriptive test names
- ✅ Keep tests simple and focused
- ✅ Test edge cases
- ✅ No mocking needed for unit tests

---

**All tests pass and ready for CI/CD!** ✨
