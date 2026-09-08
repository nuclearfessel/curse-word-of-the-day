import { WORDS } from "./words";
import { CurseWord } from "./types";

export { WORDS };
export type { CurseWord };

export function getWordById(id: string): CurseWord | undefined {
  return WORDS.find((w) => w.id === id);
}

export function getWorldAreas(): string[] {
  return Array.from(new Set(WORDS.map((w) => w.worldArea))).sort();
}

export function getLanguagesInArea(worldArea: string): string[] {
  return Array.from(
    new Set(WORDS.filter((w) => w.worldArea === worldArea).map((w) => w.language))
  ).sort();
}

export function getRegionsForLanguage(worldArea: string, language: string): string[] {
  return Array.from(
    new Set(
      WORDS.filter((w) => w.worldArea === worldArea && w.language === language).map(
        (w) => w.region
      )
    )
  ).sort();
}

export function getWordsForRegion(
  worldArea: string,
  language: string,
  region: string
): CurseWord[] {
  return WORDS.filter(
    (w) => w.worldArea === worldArea && w.language === language && w.region === region
  );
}
