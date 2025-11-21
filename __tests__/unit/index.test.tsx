import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/index';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Linking at module level
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  canOpenURL: jest.fn(() => Promise.resolve(true)),
  openURL: jest.fn(() => Promise.resolve()),
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('welcome-screen-root')).toBeTruthy();
  });

  it('renders with correct title', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('iOS Starter')).toBeTruthy();
  });

  it('renders with correct subtitle', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('React Native • Expo • TypeScript')).toBeTruthy();
  });

  it('renders with correct description', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/A modern, production-ready template/i)).toBeTruthy();
  });

  it('renders all three action buttons', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('View Repository')).toBeTruthy();
    expect(getByText('Deploy Guide')).toBeTruthy();
    expect(getByText('Repo Stats')).toBeTruthy();
  });
});
