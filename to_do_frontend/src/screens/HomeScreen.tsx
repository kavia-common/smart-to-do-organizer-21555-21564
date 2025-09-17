import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors, Radii, Spacing, Typography } from '../theme';
import { AppBar } from '../components/AppBar';
import { FAB } from '../components/FAB';
import { TodoFormModal } from '../components/TodoFormModal';
import { addTodo, deleteTodo, fetchTodos, updateTodo, type Todo } from '../lib/supabase';
import { loadTodosCache, saveTodosCache } from '../storage/cache';
import { MaterialIcons } from '@expo/vector-icons';
import { TodoItem } from '../components/TodoItem';

// PUBLIC_INTERFACE
export default function HomeScreen() {
  /** Main Home Screen showing to-do list with Ocean Professional styling and Supabase-backed CRUD. */
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cached = await loadTodosCache();
      if (cached) setTodos(JSON.parse(cached));
      const { data, error } = await fetchTodos();
      if (error) {
        setError(error);
      } else if (data) {
        setTodos(data);
        await saveTodosCache(JSON.stringify(data));
      }
    } catch (e: unknown) {
      const msg = typeof e === 'object' && e !== null && 'message' in e ? String((e as { message?: string }).message) : 'Failed to load';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const { data, error } = await fetchTodos();
      if (!error && data) {
        setTodos(data);
        await saveTodosCache(JSON.stringify(data));
      } else if (error) setError(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (item: Todo) => {
    setEditing(item);
    setShowForm(true);
  };

  const onSubmit = async (payload: { title: string; description?: string }) => {
    setShowForm(false);
    if (editing) {
      // optimistic update
      const snapshot = [...todos];
      const idx = snapshot.findIndex((t) => t.id === editing.id);
      if (idx >= 0) {
        snapshot[idx] = { ...snapshot[idx], title: payload.title, description: payload.description ?? null };
        setTodos(snapshot);
      }
      const { error } = await updateTodo(editing.id, { title: payload.title, description: payload.description });
      if (error) {
        setError(error);
        await onRefresh();
      }
      setEditing(null);
    } else {
      const optimistic: Todo = {
        id: `optimistic-${Date.now()}`,
        title: payload.title,
        description: payload.description ?? null,
        completed: false,
        created_at: new Date().toISOString(),
        updated_at: null,
      };
      setTodos((prev) => [optimistic, ...prev]);
      const { data, error } = await addTodo(payload);
      if (error) {
        setError(error);
        setTodos((prev) => prev.filter((t) => t.id !== optimistic.id));
      } else if (data) {
        setTodos((prev) => [data, ...prev.filter((t) => t.id !== optimistic.id)]);
      }
    }
  };

  const onToggle = async (item: Todo) => {
    const snapshot = [...todos];
    setTodos((prev) => prev.map((t) => (t.id === item.id ? { ...t, completed: !t.completed } : t)));
    const { error } = await updateTodo(item.id, { completed: !item.completed });
    if (error) {
      setError(error);
      setTodos(snapshot);
    }
  };

  const onDeleteItem = async (item: Todo) => {
    const snapshot = [...todos];
    setTodos((prev) => prev.filter((t) => t.id !== item.id));
    const { error } = await deleteTodo(item.id);
    if (error) {
      setError(error);
      setTodos(snapshot);
    }
  };

  const HeaderRight = useMemo(
    () => (
      <View style={styles.headerRight}>
        <MaterialIcons name="waves" size={20} color={Colors.primary} />
      </View>
    ),
    []
  );

  const empty = (
    <View style={styles.empty}>
      <MaterialIcons name="checklist" size={42} color={Colors.muted} />
      <Text style={styles.emptyTitle}>No tasks yet</Text>
      <Text style={styles.emptyDesc}>Tap the + button to add your first task.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <AppBar title="Ocean Tasks" subtitle="Stay organized" right={HeaderRight} />
        {error ? (
          <View style={styles.errorBox}>
            <MaterialIcons name="error-outline" size={18} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem item={item} onToggle={onToggle} onEdit={openEdit} onDelete={onDeleteItem} />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
            ListEmptyComponent={empty}
            contentContainerStyle={todos.length === 0 ? { flex: 1 } : undefined}
          />
        )}
        <FAB onPress={openCreate} />
        <TodoFormModal
          visible={showForm}
          onDismiss={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSubmit={onSubmit}
          initial={editing ? { title: editing.title, description: editing.description ?? undefined } : undefined}
          titleText={editing ? 'Edit Task' : 'New Task'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRight: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.round,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    margin: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radii.md,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorText: {
    color: Colors.error,
    marginLeft: 6,
    flex: 1,
  },
  empty: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    ...Typography.title,
    marginTop: Spacing.md,
  },
  emptyDesc: {
    ...Typography.subtitle,
    marginTop: 4,
  },
});
