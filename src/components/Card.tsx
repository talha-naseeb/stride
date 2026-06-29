import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
};

export const Card: React.FC<Props> = ({ children, style, padding = 16 }) => {
  const { colors } = useTheme();
  return (
    <View style={[{
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding,
      borderWidth: 0.5,
      borderColor: colors.border,
    }, style]}>
      {children}
    </View>
  );
};
