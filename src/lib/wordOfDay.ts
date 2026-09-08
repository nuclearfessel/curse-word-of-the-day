import { WORDS } from "../data/words";
import { CurseWord } from "../data/types";

function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getWordOfDay(date: Date = new Date(), pool: CurseWord[] = WORDS): CurseWord {
  const usablePool = pool.length > 0 ? pool : WORDS;
  const key = dateKey(date);
  const index = hashString(key) % usablePool.length;
  return usablePool[index];
}
