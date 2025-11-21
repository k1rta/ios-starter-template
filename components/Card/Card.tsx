import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  glowing?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = false,
  glowing = false,
}) => {
  const cardStyles = [
    styles.card,
    elevated && styles.elevated,
    glowing && styles.glowing,
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  glowing: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
});
