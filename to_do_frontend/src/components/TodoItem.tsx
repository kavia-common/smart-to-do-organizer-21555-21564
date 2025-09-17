import React, { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Colors, Radii, Spacing, Typography } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';
import type { Todo } from '../lib/supabase';

type Props = {
  item: Todo;
  onToggle: (item: Todo) => void;
  onEdit: (item: Todo) => void;
  onDelete: (item: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({ item, onToggle, onEdit, onDelete }) => {
  const ref = useRef<Swipeable>(null);

  const renderRightActions = () => (
    <View style={styles.actions}>
      <Pressable onPress={() => { ref.current?.close(); onEdit(item); }} style={({ pressed }) => [styles.actionBtn, styles.edit, pressed && styles.pressed]}>
        <MaterialIcons name="edit" size={22} color="#fff" />
        <Text style={styles.actionText}>Edit</Text>
      </Pressable>
      <Pressable onPress={() => { ref.current?.close(); onDelete(item); }} style={({ pressed }) => [styles.actionBtn, styles.delete, pressed && styles.pressed]}>
        <MaterialIcons name="delete" size={22} color="#fff" />
        <Text style={styles.actionText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <Swipeable ref={ref} renderRightActions={renderRightActions} overshootRight={false}>
      <View style={styles.card}>
        <Pressable onPress={() => onToggle(item)} style={({ pressed }) => [styles.checkbox, item.completed && styles.checkboxOn, pressed && styles.pressed]}>
          {item.completed ? <MaterialIcons name="check" size={20} color="#fff" /> : null}
        </Pressable>
        <Pressable style={styles.textArea} onPress={() => onEdit(item)}>
          <Text style={[styles.title, item.completed && styles.titleDone]} numberOfLines={2}>{item.title}</Text>
          {item.description ? <Text style={styles.desc} numberOfLines={2}>{item.description}</Text> : null}
        </Pressable>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: Radii.round,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    backgroundColor: '#fff',
  },
  checkboxOn: {
    backgroundColor: Colors.primary,
  },
  textArea: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    fontWeight: '700',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: Colors.muted,
  },
  desc: {
    ...Typography.subtitle,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Spacing.lg,
    gap: Spacing.sm,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Radii.md,
  },
  edit: {
    backgroundColor: Colors.secondary,
  },
  delete: {
    backgroundColor: Colors.error,
  },
  actionText: {
    color: '#fff',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
