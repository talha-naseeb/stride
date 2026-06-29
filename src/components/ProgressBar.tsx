import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = {
  progress: number;
  color: string;
  height?: number;
};

export const ProgressBar: React.FC<Props> = ({ progress, color, height = 6 }) => {
  const { colors } = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: Math.min(progress, 1),
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <View style={{ height, backgroundColor: colors.surface2, borderRadius: height / 2, overflow: 'hidden' }}>
      <Animated.View style={{
        height,
        borderRadius: height / 2,
        backgroundColor: color,
        width: anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
      }} />
    </View>
  );
};
