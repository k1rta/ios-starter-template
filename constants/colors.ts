/**
 * Simplified 3-Color Tech Palette
 * 1. Deep Space Blue (Background/Dark)
 * 2. Electric Cyan (Primary/Accent)
 * 3. Pure White (Text/Contrast)
 */
export const colors = {
  // Color 1: Deep Space Blue (Background)
  background: '#0a0f1e',
  surface: '#141b2e',
  surfaceHighlight: '#1a2338',

  // Color 2: Electric Cyan (Primary Actions)
  primary: '#00e5ff',
  primaryDim: '#0099b3',
  primaryBright: '#4dffff',

  // Color 3: Pure White (Text & Contrast)
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.4)',

  // Derived colors
  onPrimary: '#0a0f1e',
  border: 'rgba(0, 229, 255, 0.15)',

  // Shadows & Glows (all cyan-based)
  shadowSoft: 'rgba(0, 229, 255, 0.1)',
  shadowMedium: 'rgba(0, 229, 255, 0.3)',
  shadowStrong: 'rgba(0, 229, 255, 0.5)',
  shadowIntense: 'rgba(0, 229, 255, 0.8)',

  // Status (using existing palette)
  success: '#00e5ff',
  warning: '#00e5ff',
  danger: '#00e5ff',
};
