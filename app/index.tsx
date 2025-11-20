import { StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { WelcomeScreen } from '@/components/welcome-screen/welcome-screen';
import { colors } from '@/constants/colors';

const REPO_URL = 'https://github.com/k1rta/ios-starter-template';
const README_URL = 'https://github.com/k1rta/ios-starter-template#readme';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const handleGetStarted = async () => {
    try {
      const supported = await Linking.canOpenURL(REPO_URL);
      if (supported) {
        await Linking.openURL(REPO_URL);
      } else {
        Alert.alert('Error', `Cannot open URL: ${REPO_URL}`);
      }
    } catch (error) {
      console.error('Error opening repo:', error);
      Alert.alert('Error', 'Failed to open repository');
    }
  };

  const handleReadme = async () => {
    try {
      const supported = await Linking.canOpenURL(README_URL);
      if (supported) {
        await Linking.openURL(README_URL);
      } else {
        Alert.alert('Error', `Cannot open URL: ${README_URL}`);
      }
    } catch (error) {
      console.error('Error opening readme:', error);
      Alert.alert('Error', 'Failed to open README');
    }
  };

  const handleStats = () => {
    router.push('/stats');
  };

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeScreen
        title="iOS Starter"
        subtitle="React Native • Expo • TypeScript"
        description="A modern, production-ready template to kickstart your next iOS app. Built with best practices and ready to ship."
        primaryActionLabel="View Repository"
        onPrimaryActionPress={handleGetStarted}
        secondaryActionLabel="Read Docs"
        onSecondaryActionPress={handleReadme}
        tertiaryActionLabel="Repo Stats"
        onTertiaryActionPress={handleStats}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default HomeScreen;
