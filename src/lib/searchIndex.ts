import Fuse from "fuse.js";
import { WORDS } from "../data/words";
import { CurseWord } from "../data/types";

const fuse = new Fuse<CurseWord>(WORDS, {
  keys: [
    { name: "term", weight: 0.35 },
    { name: "transliteration", weight: 0.25 },
    { name: "language", weight: 0.15 },
    { name: "region", weight: 0.15 },
    { name: "meaning", weight: 0.1 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
});

export function searchWords(query: string): CurseWord[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return fuse.search(trimmed).map((result) => result.item);
}
