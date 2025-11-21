import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Linking } from 'react-native';
import HomeScreen from '@/app/index';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock Linking
jest.spyOn(Linking, 'canOpenURL').mockResolvedValue(true);
jest.spyOn(Linking, 'openURL').mockResolvedValue(true);

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders home screen with title', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('iOS Starter')).toBeTruthy();
  });

  it('renders subtitle with tech stack', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('React Native • Expo • TypeScript')).toBeTruthy();
  });

  it('renders description', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/modern, production-ready template/i)).toBeTruthy();
  });

  it('renders stat values', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('stat-coverage-value')).toBeTruthy();
    expect(getByTestId('stat-version-value')).toBeTruthy();
    expect(getByTestId('stat-platform-value')).toBeTruthy();
  });

  it('renders all action buttons', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('View Repository')).toBeTruthy();
    expect(getByText('Read Docs')).toBeTruthy();
    expect(getByText('Repo Stats')).toBeTruthy();
  });

  it('opens repository URL when primary button is pressed', async () => {
    const { getByText } = render(<HomeScreen />);
    const button = getByText('View Repository');
    
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith('https://github.com/k1rta/ios-starter-template');
    });
  });

  it('opens README URL when Read Docs is pressed', async () => {
    const { getByText } = render(<HomeScreen />);
    const button = getByText('Read Docs');
    
    fireEvent.press(button);
    
    await waitFor(() => {
      expect(Linking.openURL).toHaveBeenCalledWith('https://github.com/k1rta/ios-starter-template#readme');
    });
  });

  it('has mobile icon displayed', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('welcome-title')).toBeTruthy();
  });
});
