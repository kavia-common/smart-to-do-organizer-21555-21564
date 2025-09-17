import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Colors, Radii, Spacing, Typography } from '../theme';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSubmit: (payload: { title: string; description?: string }) => void;
  initial?: { title: string; description?: string };
  titleText?: string;
};

export const TodoFormModal: React.FC<Props> = ({ visible, onDismiss, onSubmit, initial, titleText = 'New Task' }) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [desc, setDesc] = useState(initial?.description ?? '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setTitle(initial?.title ?? '');
      setDesc(initial?.description ?? '');
      setError(null);
    }
  }, [visible, initial]);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }
    onSubmit({ title: title.trim(), description: desc.trim() || undefined });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.header}>{titleText}</Text>
          <TextInput
            placeholder="Task title"
            placeholderTextColor={Colors.muted}
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description (optional)"
            placeholderTextColor={Colors.muted}
            style={[styles.input, styles.multiline]}
            value={desc}
            onChangeText={setDesc}
            multiline
            numberOfLines={3}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.actions}>
            <Pressable onPress={onDismiss} style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed, styles.cancel]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={handleSave} style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed, styles.save]}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.35)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radii.lg,
    borderTopRightRadius: Radii.lg,
    padding: Spacing.lg,
  },
  header: {
    ...Typography.title,
    marginBottom: Spacing.md,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  multiline: {
    height: 96,
    textAlignVertical: 'top',
  },
  error: {
    color: Colors.error,
    marginBottom: Spacing.sm,
  },
  actions: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  actionBtn: {
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.md,
  },
  cancel: {
    backgroundColor: '#F3F4F6',
  },
  save: {
    backgroundColor: Colors.primary,
  },
  cancelText: {
    color: Colors.text,
    fontWeight: '600',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
