import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
};

export const StatCard: React.FC<Props> = ({ label, value, sub, accent }) => {
  const { colors } = useTheme();
  return (
    <View style={{
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 14,
      borderWidth: 0.5,
      borderColor: colors.border,
      flex: 1,
    }}>
      <Text style={{ fontSize: 10, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
        {label}
      </Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: accent ?? colors.text, lineHeight: 26 }}>
        {value}
      </Text>
      {sub && <Text style={{ fontSize: 11, color: colors.textSecondary, marginTop: 3 }}>{sub}</Text>}
    </View>
  );
};
