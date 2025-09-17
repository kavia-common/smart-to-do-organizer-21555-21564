import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors, Elevation, Radii } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
};

export const FAB: React.FC<Props> = ({ onPress, icon = 'add' }) => {
  return (
    <View style={styles.wrap}>
      <Pressable style={({ pressed }) => [styles.btn, pressed && styles.pressed]} onPress={onPress} accessibilityRole="button">
        <MaterialIcons name={icon} color="#fff" size={28} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 20,
    bottom: 24,
  },
  btn: {
    width: 56,
    height: 56,
    borderRadius: Radii.round,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Elevation.card,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
