import { WORDS } from "./words";
import { CurseWord } from "./types";

export { WORDS };
export type { CurseWord };

export function getWordById(id: string): CurseWord | undefined {
  return WORDS.find((w) => w.id === id);
}

export function getLanguages(): string[] {
  return Array.from(new Set(WORDS.map((w) => w.language))).sort((a, b) => a.localeCompare(b));
}

export function getRegionsForLanguage(language: string): string[] {
  return Array.from(
    new Set(WORDS.filter((w) => w.language === language).map((w) => w.region))
  ).sort((a, b) => a.localeCompare(b));
}

export function getWordsForRegion(language: string, region: string): CurseWord[] {
  return WORDS.filter((w) => w.language === language && w.region === region).sort((a, b) =>
    a.term.localeCompare(b.term)
  );
}

export function hasSingleRegion(language: string): boolean {
  return getRegionsForLanguage(language).length === 1;
}
