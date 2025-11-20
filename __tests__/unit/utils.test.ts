import { capitalize, formatCurrency, sleep } from '@/utils';

describe('Utils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('World')).toBe('World');
    });
  });

  describe('formatCurrency', () => {
    it('should format USD by default', () => {
      expect(formatCurrency(100)).toBe('$100.00');
    });

    it('should format other currencies', () => {
      expect(formatCurrency(100, 'EUR')).toContain('€');
    });
  });

  describe('sleep', () => {
    it('should wait for specified duration', async () => {
      const start = Date.now();
      await sleep(100);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(90); // Allow small variance
    });
  });
});
