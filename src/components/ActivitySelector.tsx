import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { ActivityColors, ActivityIcons, ActivityLabels } from '../lib/theme';
import type { ActivityType } from '../lib/theme';

type Props = {
  selected: ActivityType;
  onSelect: (type: ActivityType) => void;
};

const TYPES: ActivityType[] = ['run', 'walk', 'cycle'];

export const ActivitySelector: React.FC<Props> = ({ selected, onSelect }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {TYPES.map((type) => {
        const isActive = selected === type;
        const color = ActivityColors[type];
        return (
          <TouchableOpacity
            key={type}
            onPress={() => onSelect(type)}
            style={{
              flex: 1,
              backgroundColor: isActive ? `${color}18` : colors.surface,
              borderRadius: 12,
              padding: 12,
              alignItems: 'center',
              borderWidth: isActive ? 1.5 : 0.5,
              borderColor: isActive ? color : colors.border,
            }}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name={ActivityIcons[type] as any}
              size={26}
              color={isActive ? color : colors.textSecondary}
            />
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: isActive ? color : colors.textSecondary,
              marginTop: 4,
            }}>
              {ActivityLabels[type]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
