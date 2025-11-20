import { colors } from '@/constants/colors';

describe('Colors Constants', () => {
  it('should have core background colors', () => {
    expect(colors).toHaveProperty('background');
    expect(colors).toHaveProperty('surface');
    expect(colors).toHaveProperty('surfaceHighlight');
  });

  it('should have primary color variants', () => {
    expect(colors).toHaveProperty('primary');
    expect(colors).toHaveProperty('primaryDim');
    expect(colors).toHaveProperty('primaryBright');
  });

  it('should have text color variants', () => {
    expect(colors).toHaveProperty('textPrimary');
    expect(colors).toHaveProperty('textSecondary');
    expect(colors).toHaveProperty('textTertiary');
  });

  it('should have derived colors', () => {
    expect(colors).toHaveProperty('onPrimary');
    expect(colors).toHaveProperty('border');
  });

  it('should have status colors', () => {
    expect(colors).toHaveProperty('success');
    expect(colors).toHaveProperty('warning');
    expect(colors).toHaveProperty('danger');
  });

  it('should have valid hex colors for solid colors', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
    expect(hexColorRegex.test(colors.background)).toBe(true);
    expect(hexColorRegex.test(colors.primary)).toBe(true);
    expect(hexColorRegex.test(colors.textPrimary)).toBe(true);
  });

  it('should have valid rgba colors for transparent colors', () => {
    const rgbaColorRegex = /^rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)$/;
    expect(rgbaColorRegex.test(colors.textSecondary)).toBe(true);
    expect(rgbaColorRegex.test(colors.border)).toBe(true);
  });

  it('should use cyan as primary color', () => {
    expect(colors.primary).toBe('#00e5ff');
  });
});
