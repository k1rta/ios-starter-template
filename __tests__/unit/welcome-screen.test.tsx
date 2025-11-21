import { render } from '@testing-library/react-native';
import { WelcomeScreen } from '@/components/welcome-screen/welcome-screen';

describe('WelcomeScreen', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    primaryActionLabel: 'Primary Action',
    onPrimaryActionPress: jest.fn(),
    secondaryActionLabel: 'Secondary Action',
    onSecondaryActionPress: jest.fn(),
    tertiaryActionLabel: 'Tertiary Action',
    onTertiaryActionPress: jest.fn(),
  };

  it('renders correctly with all props', () => {
    const { getByTestId, getByText } = render(
      <WelcomeScreen {...defaultProps} />,
    );

    expect(getByTestId('welcome-screen-root')).toBeTruthy();
    expect(getByText('Test Title')).toBeTruthy();
    expect(getByText('Test Subtitle')).toBeTruthy();
    expect(getByText('Test Description')).toBeTruthy();
  });

  it('renders title correctly', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('welcome-title')).toBeTruthy();
  });

  it('renders subtitle when provided', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('welcome-subtitle')).toBeTruthy();
  });

  it('does not render subtitle when not provided', () => {
    const { queryByTestId } = render(
      <WelcomeScreen {...defaultProps} subtitle={undefined} />,
    );
    expect(queryByTestId('welcome-subtitle')).toBeNull();
  });

  it('renders description when provided', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('welcome-description')).toBeTruthy();
  });

  it('does not render description when not provided', () => {
    const { queryByTestId } = render(
      <WelcomeScreen {...defaultProps} description={undefined} />,
    );
    expect(queryByTestId('welcome-description')).toBeNull();
  });

  it('renders stats container', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('stats-container')).toBeTruthy();
  });

  it('renders all stat values correctly', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('stat-coverage-value')).toBeTruthy();
    expect(getByTestId('stat-version-value')).toBeTruthy();
    expect(getByTestId('stat-platform-value')).toBeTruthy();
  });

  it('renders primary action button when handler provided', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('primary-action-button')).toBeTruthy();
  });

  it('renders secondary action button when handler provided', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('secondary-action-button')).toBeTruthy();
  });

  it('renders tertiary action button when handler provided', () => {
    const { getByTestId } = render(<WelcomeScreen {...defaultProps} />);
    expect(getByTestId('tertiary-action-button')).toBeTruthy();
  });

  it('does not render primary button when handler not provided', () => {
    const { queryByTestId } = render(
      <WelcomeScreen {...defaultProps} onPrimaryActionPress={undefined} />,
    );
    expect(queryByTestId('primary-action-button')).toBeNull();
  });

  it('does not render secondary button when handler not provided', () => {
    const { queryByTestId } = render(
      <WelcomeScreen {...defaultProps} onSecondaryActionPress={undefined} />,
    );
    expect(queryByTestId('secondary-action-button')).toBeNull();
  });

  it('does not render tertiary button when handler not provided', () => {
    const { queryByTestId } = render(
      <WelcomeScreen {...defaultProps} onTertiaryActionPress={undefined} />,
    );
    expect(queryByTestId('tertiary-action-button')).toBeNull();
  });

  it('uses custom button labels when provided', () => {
    const { getByText } = render(
      <WelcomeScreen
        title="Test"
        primaryActionLabel="Custom Primary"
        onPrimaryActionPress={jest.fn()}
      />,
    );
    expect(getByText('Custom Primary')).toBeTruthy();
  });

  it('renders with minimal props', () => {
    const { getByText } = render(<WelcomeScreen title="Minimal Test" />);
    expect(getByText('Minimal Test')).toBeTruthy();
  });
});
