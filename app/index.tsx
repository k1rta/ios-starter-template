import { StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { WelcomeScreen } from '@/components/welcome-screen/welcome-screen';
import { colors } from '@/constants/colors';

const REPO_URL = 'https://github.com/k1rta/ios-starter-template';
const DEPLOYMENT_URL =
  'https://github.com/k1rta/ios-starter-template/blob/main/DEPLOYMENT_GUIDE.md';

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

  const handleDeploymentGuide = async () => {
    try {
      const supported = await Linking.canOpenURL(DEPLOYMENT_URL);
      if (supported) {
        await Linking.openURL(DEPLOYMENT_URL);
      } else {
        Alert.alert('Error', `Cannot open URL: ${DEPLOYMENT_URL}`);
      }
    } catch (error) {
      console.error('Error opening deployment guide:', error);
      Alert.alert('Error', 'Failed to open Deployment Guide');
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
        secondaryActionLabel="Deploy Guide"
        onSecondaryActionPress={handleDeploymentGuide}
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
