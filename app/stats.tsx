import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faCodeBranch, faEye, faHdd, faCircleExclamation, faClock } from '@fortawesome/free-solid-svg-icons';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
  size: number;
  openIssues: number;
  lastUpdated: string;
}

export default function StatsScreen() {
  const router = useRouter();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Particles (8 particles)
  const particles = useRef(
    Array.from({ length: 8 }, () => ({
      x: new Animated.Value((Math.random() - 0.5) * 400),
      y: new Animated.Value((Math.random() - 0.5) * 800),
      opacity: new Animated.Value(Math.random() * 0.4 + 0.1),
    }))
  ).current;

  useEffect(() => {
    // Entrance animations
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

    // Particle animations
    particles.forEach((particle, index) => {
      const animateParticle = () => {
        Animated.parallel([
          Animated.sequence([
            Animated.timing(particle.x, {
              toValue: (Math.random() - 0.5) * 400,
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
              toValue: (Math.random() - 0.5) * 800,
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
            ])
          ),
        ]).start(() => animateParticle());
      };
      animateParticle();
    });

    // Fetch GitHub stats
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    try {
      const url = 'https://api.github.com/repos/k1rta/ios-starter-template';
      console.log('🌐 Fetching GitHub stats from:', url);
      
      const response = await fetch(url);
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      console.log('✅ GitHub API Response:', data);
      
      const lastUpdated = new Date(data.updated_at);
      const formattedDate = lastUpdated.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      
      setStats({
        stars: data.stargazers_count,
        forks: data.forks_count,
        watchers: data.watchers_count,
        size: Math.round(data.size / 1024), // Convert to MB
        openIssues: data.open_issues_count,
        lastUpdated: formattedDate,
      });
    } catch (err) {
      setError('Failed to load repository stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Repository Stats</Text>
          <Text style={styles.subtitle}>Live from GitHub API</Text>
        </View>

        {/* Stats Content */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching stats...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable style={styles.retryButton} onPress={fetchGitHubStats}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        ) : stats ? (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 215, 0, 0.15)' }]}>
                <FontAwesomeIcon icon={faStar} size={28} color="#FFD700" />
              </View>
              <Text style={styles.statValue}>{stats.stars}</Text>
              <Text style={styles.statLabel}>Stars</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(138, 43, 226, 0.15)' }]}>
                <FontAwesomeIcon icon={faCodeBranch} size={28} color="#8A2BE2" />
              </View>
              <Text style={styles.statValue}>{stats.forks}</Text>
              <Text style={styles.statLabel}>Forks</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(0, 229, 255, 0.15)' }]}>
                <FontAwesomeIcon icon={faEye} size={28} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{stats.watchers}</Text>
              <Text style={styles.statLabel}>Watchers</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(50, 205, 50, 0.15)' }]}>
                <FontAwesomeIcon icon={faHdd} size={28} color="#32CD32" />
              </View>
              <Text style={styles.statValue}>{stats.size}MB</Text>
              <Text style={styles.statLabel}>Size</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 69, 0, 0.15)' }]}>
                <FontAwesomeIcon icon={faCircleExclamation} size={28} color="#FF4500" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={styles.statValue}>{stats.openIssues}</Text>
              </View>
              <Text style={styles.statLabel}>Open Issues</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 105, 180, 0.15)' }]}>
                <FontAwesomeIcon icon={faClock} size={28} color="#FF69B4" />
              </View>
              <View style={styles.valueContainer}>
                <Text style={[styles.statValue, styles.dateValue]}>{stats.lastUpdated}</Text>
              </View>
              <Text style={styles.statLabel}>Last Updated</Text>
            </View>
          </View>
        ) : null}

        {/* Back Button */}
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    left: '50%',
    top: '50%',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
    }),
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: 'rgba(19, 24, 36, 0.7)',
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 60,
      },
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: colors.shadowSoft,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: 14,
  },
  errorContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  errorText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    minHeight: 130,
    backgroundColor: 'rgba(0, 229, 255, 0.08)',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 229, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
    }),
  },
  statIcon: {
    marginBottom: spacing.xs,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  valueContainer: {
    minHeight: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  backButton: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.primary,
    transform: [{ scale: 0.98 }],
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
