/**
 * Integration Layer Test: App Flow
 * Tests user flows and screen interactions
 */
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@/app/index';
import { TEST_DATA } from '../test-data';

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

describe('App Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render home screen with welcome component', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText(TEST_DATA.APP_TITLE)).toBeTruthy();
    expect(getByText(TEST_DATA.APP_SUBTITLE)).toBeTruthy();
  });

  it('should display all action buttons', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText(TEST_DATA.BUTTON_PRIMARY)).toBeTruthy();
    expect(getByText(TEST_DATA.BUTTON_SECONDARY)).toBeTruthy();
    expect(getByText(TEST_DATA.BUTTON_TERTIARY)).toBeTruthy();
  });

  it('should handle button interactions', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Just verify buttons are clickable - actual URL opening is tested separately
    const primaryButton = getByText(TEST_DATA.BUTTON_PRIMARY);
    const secondaryButton = getByText(TEST_DATA.BUTTON_SECONDARY);
    
    expect(primaryButton).toBeTruthy();
    expect(secondaryButton).toBeTruthy();
    
    // Buttons should be pressable (no errors thrown)
    fireEvent.press(primaryButton);
    fireEvent.press(secondaryButton);
  });

  it('should render app description', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText(TEST_DATA.APP_DESCRIPTION)).toBeTruthy();
  });
});
