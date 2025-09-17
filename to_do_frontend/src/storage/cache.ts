import { Platform } from 'react-native';

// Use a simple in-memory fallback; in a real app, AsyncStorage should be used.
// Expo SDK 53 splits AsyncStorage. We avoid extra deps; this cache supports ephemeral sessions.
const memoryCache: Record<string, string> = {};

async function setItem(key: string, value: string) {
  memoryCache[key] = value;
}

async function getItem(key: string) {
  return memoryCache[key] ?? null;
}

const CACHE_PREFIX = 'todo-cache:';

export async function saveTodosCache(json: string) {
  return setItem(CACHE_PREFIX + 'todos', json);
}

export async function loadTodosCache(): Promise<string | null> {
  return getItem(CACHE_PREFIX + 'todos');
}

export const isWeb = Platform.OS === 'web';
