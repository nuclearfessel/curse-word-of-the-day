import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "favorites:v1";

export async function getFavoriteIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export async function isFavorite(id: string): Promise<boolean> {
  const ids = await getFavoriteIds();
  return ids.includes(id);
}

export async function toggleFavorite(id: string): Promise<boolean> {
  const ids = await getFavoriteIds();
  const idx = ids.indexOf(id);
  let next: string[];
  let nowFavorite: boolean;
  if (idx === -1) {
    next = [...ids, id];
    nowFavorite = true;
  } else {
    next = ids.filter((x) => x !== id);
    nowFavorite = false;
  }
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return nowFavorite;
}
