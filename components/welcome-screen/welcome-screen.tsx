import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface WelcomeScreenProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryActionLabel?: string;
  onPrimaryActionPress?: () => void;
  secondaryActionLabel?: string;
  onSecondaryActionPress?: () => void;
  tertiaryActionLabel?: string;
  onTertiaryActionPress?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  title,
  subtitle,
  description,
  primaryActionLabel = 'Get Started',
  onPrimaryActionPress,
  secondaryActionLabel = 'Learn More',
  onSecondaryActionPress,
  tertiaryActionLabel = 'Docs',
  onTertiaryActionPress,
}) => {
  // Enhanced smooth animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  // Particle animations (8 particles spread across screen)
  const particles = useRef(
    Array.from({ length: 8 }, () => ({
      x: new Animated.Value((Math.random() - 0.5) * 400), // -200 to 200
      y: new Animated.Value((Math.random() - 0.5) * 800), // -400 to 400
      opacity: new Animated.Value(Math.random() * 0.4 + 0.1),
    })),
  ).current;

  useEffect(() => {
    let isMounted = true;
    const animations: Animated.CompositeAnimation[] = [];

    // Smooth entrance with easing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Smooth pulsing glow animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );
    animations.push(pulseLoop);
    pulseLoop.start();

    // Breathing glow effect
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.5,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    );
    animations.push(glowLoop);
    glowLoop.start();

    // Animate particles across entire screen
    particles.forEach((particle, index) => {
      const animateParticle = () => {
        if (!isMounted) return;

        const particleAnim = Animated.parallel([
          Animated.sequence([
            Animated.timing(particle.x, {
              toValue: (Math.random() - 0.5) * 400, // -200 to 200
              duration: 3000 + index * 1000,
              useNativeDriver: true,
            }),
            Animated.timing(particle.x, {
              toValue: (Math.random() - 0.5) * 400,
              duration: 3000 + index * 1000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(particle.y, {
              toValue: (Math.random() - 0.5) * 800, // -400 to 400
              duration: 4000 + index * 800,
              useNativeDriver: true,
            }),
            Animated.timing(particle.y, {
              toValue: (Math.random() - 0.5) * 800,
              duration: 4000 + index * 800,
              useNativeDriver: true,
            }),
          ]),
          Animated.loop(
            Animated.sequence([
              Animated.timing(particle.opacity, {
                toValue: 0.5,
                duration: 2000,
                useNativeDriver: true,
              }),
              Animated.timing(particle.opacity, {
                toValue: 0.1,
                duration: 2000,
                useNativeDriver: true,
              }),
            ]),
          ),
        ]);
        animations.push(particleAnim);
        particleAnim.start(() => {
          if (isMounted) animateParticle();
        });
      };
      animateParticle();
    });

    // Cleanup on unmount - stop ALL animations
    return () => {
      isMounted = false;
      animations.forEach((anim) => anim.stop());
    };
  }, [fadeAnim, slideAnim, pulseAnim, glowAnim, particles]);

  return (
    <View style={styles.root} testID="welcome-screen-root">
      {/* Animated particles in background */}
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              opacity: particle.opacity,
              transform: [
                { translateX: particle.x },
                { translateY: particle.y },
              ],
            },
          ]}
        />
      ))}

      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <FontAwesomeIcon
                icon={faMobileScreenButton}
                size={52}
                color="#00FFFF" // Brighter cyan for more pop
              />
            </View>
          </View>
          <Text style={styles.title} testID="welcome-title">
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} testID="welcome-subtitle">
              {subtitle}
            </Text>
          ) : null}
          {description ? (
            <Text style={styles.description} testID="welcome-description">
              {description}
            </Text>
          ) : null}
        </View>

        <View style={styles.statsContainer} testID="stats-container">
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="stat-coverage-value">
              100%
            </Text>
            <Text style={styles.statLabel}>COVERAGE</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="stat-version-value">
              v1.0
            </Text>
            <Text style={styles.statLabel}>VERSION</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue} testID="stat-platform-value">
              iOS
            </Text>
            <Text style={styles.statLabel}>PLATFORM</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          {onPrimaryActionPress ? (
            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
              onPress={onPrimaryActionPress}
              testID="primary-action-button"
            >
              <Text style={styles.primaryButtonLabel}>
                {primaryActionLabel}
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.secondaryActionsRow}>
            {onSecondaryActionPress ? (
              <Pressable
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.secondaryButtonPressed,
                ]}
                onPress={onSecondaryActionPress}
                testID="secondary-action-button"
              >
                <Text style={styles.secondaryButtonLabel}>
                  {secondaryActionLabel}
                </Text>
              </Pressable>
            ) : null}
            {onTertiaryActionPress ? (
              <Pressable
                style={({ pressed }) => [
                  styles.tertiaryButton,
                  pressed && styles.tertiaryButtonPressed,
                ]}
                onPress={onTertiaryActionPress}
                testID="tertiary-action-button"
              >
                <Text style={styles.tertiaryButtonLabel}>
                  {tertiaryActionLabel}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: 'rgba(15, 20, 30, 0.85)', // Darker, more modern glass effect
    borderRadius: 28,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: 'rgba(0, 229, 255, 0.4)', // Stronger cyan border
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 24 },
        shadowOpacity: 0.7,
        shadowRadius: 80,
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(0, 229, 255, 0.18)', // More vibrant background
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 229, 255, 0.5)', // Add border to make it pop
    ...Platform.select({
      ios: {
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.6,
        shadowRadius: 24,
      },
    }),
  },
  title: {
    fontSize: 52,
    fontWeight: '800',
    color: '#FFFFFF', // Pure white for better contrast
    marginBottom: spacing.xs,
    textAlign: 'center',
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#00FFFF', // Bright cyan
    marginBottom: spacing.sm,
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: '#00E5FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: 'transparent',
    borderRadius: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textTertiary,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  actionsContainer: {
    width: '100%',
    gap: spacing.sm,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E5FF', // Bright cyan
    borderWidth: 1,
    borderColor: '#00FFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
      },
    }),
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryDim,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonLabel: {
    color: '#0A0F1E', // Dark text on bright button
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 229, 255, 0.4)',
    ...Platform.select({
      ios: {
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
    }),
  },
  secondaryButtonPressed: {
    backgroundColor: 'rgba(0, 229, 255, 0.2)',
    borderColor: '#00FFFF',
    transform: [{ scale: 0.97 }],
  },
  secondaryButtonLabel: {
    color: '#00FFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  tertiaryButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(0, 229, 255, 0.4)',
    ...Platform.select({
      ios: {
        shadowColor: '#00E5FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
    }),
  },
  tertiaryButtonPressed: {
    backgroundColor: 'rgba(0, 229, 255, 0.2)',
    borderColor: '#00FFFF',
    transform: [{ scale: 0.97 }],
  },
  tertiaryButtonLabel: {
    color: '#00FFFF',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  particle: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#00FFFF', // Brighter particles
    left: '50%',
    top: '50%',
    ...Platform.select({
      ios: {
        shadowColor: '#00FFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
    }),
  },
});
