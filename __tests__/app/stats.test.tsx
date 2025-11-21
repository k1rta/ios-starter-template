import { render, waitFor, fireEvent } from '@testing-library/react-native';
import StatsScreen from '@/app/stats';

// Mock expo-router
const mockBack = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Mock fetch
global.fetch = jest.fn();

const mockStatsData = {
  stargazers_count: 42,
  forks_count: 15,
  watchers_count: 42,
  size: 10240, // 10MB in KB
  open_issues_count: 3,
  updated_at: '2025-11-20T12:00:00Z',
};

describe('Stats Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockStatsData,
    });
  });

  it('renders stats screen title', () => {
    const { getByText } = render(<StatsScreen />);
    expect(getByText('Repository Stats')).toBeTruthy();
  });

  it('shows loading state initially', () => {
    const { getByText } = render(<StatsScreen />);
    expect(getByText('Fetching stats...')).toBeTruthy();
  });

  it('fetches and displays GitHub stats', async () => {
    const { getByText } = render(<StatsScreen />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/k1rta/ios-starter-template'
      );
    });

    await waitFor(() => {
      expect(getByText('42')).toBeTruthy(); // Stars
      expect(getByText('15')).toBeTruthy(); // Forks
      expect(getByText('10MB')).toBeTruthy(); // Size
      expect(getByText('3')).toBeTruthy(); // Issues
    });
  });

  it('displays stat labels', async () => {
    const { getByText } = render(<StatsScreen />);

    await waitFor(() => {
      expect(getByText('Stars')).toBeTruthy();
      expect(getByText('Forks')).toBeTruthy();
      expect(getByText('Watchers')).toBeTruthy();
      expect(getByText('Size')).toBeTruthy();
      expect(getByText('Open Issues')).toBeTruthy();
      expect(getByText('Last Updated')).toBeTruthy();
    });
  });

  it('shows error state when fetch fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { getByText } = render(<StatsScreen />);

    await waitFor(() => {
      expect(getByText('Failed to load repository stats')).toBeTruthy();
    });
  });

  it('allows retry on error', async () => {
    (global.fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStatsData,
      });

    const { getByText } = render(<StatsScreen />);

    await waitFor(() => {
      expect(getByText('Failed to load repository stats')).toBeTruthy();
    });

    const retryButton = getByText('Retry');
    fireEvent.press(retryButton);

    await waitFor(() => {
      expect(getByText('42')).toBeTruthy();
    });
  });

  it('navigates back when back button is pressed', async () => {
    const { getByText } = render(<StatsScreen />);

    await waitFor(() => {
      expect(getByText('← Back to Home')).toBeTruthy();
    });

    const backButton = getByText('← Back to Home');
    fireEvent.press(backButton);

    expect(mockBack).toHaveBeenCalled();
  });

  it('formats date correctly', async () => {
    const { getByText } = render(<StatsScreen />);

    await waitFor(() => {
      // Date should be formatted as "Nov 20, 2025"
      expect(getByText(/Nov 20, 2025/i)).toBeTruthy();
    });
  });
});
