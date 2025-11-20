import { spacing } from '@/constants/spacing';

describe('Spacing Constants', () => {
  it('should have all required spacing properties', () => {
    expect(spacing).toHaveProperty('xs');
    expect(spacing).toHaveProperty('sm');
    expect(spacing).toHaveProperty('md');
    expect(spacing).toHaveProperty('lg');
    expect(spacing).toHaveProperty('xl');
  });

  it('should have numeric values', () => {
    Object.entries(spacing).forEach(([, value]) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });

  it('should have ascending values', () => {
    expect(spacing.xs).toBeLessThan(spacing.sm);
    expect(spacing.sm).toBeLessThan(spacing.md);
    expect(spacing.md).toBeLessThan(spacing.lg);
    expect(spacing.lg).toBeLessThan(spacing.xl);
  });
});
