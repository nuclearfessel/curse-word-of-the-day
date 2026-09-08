export type Category =
  | "sexual"
  | "scatological"
  | "religious"
  | "family"
  | "animal"
  | "insult"
  | "other";

export type Severity = 1 | 2 | 3 | 4;

export interface CurseWord {
  id: string;
  term: string;
  transliteration?: string;
  language: string;
  languageCode: string;
  region: string;
  regionCode: string;
  worldArea: string;
  pronunciation?: string;
  literalMeaning: string;
  origin: string;
  meaning: string;
  usageNote: string;
  category: Category;
  severity: Severity;
  exampleSentence?: string;
}

export const SEVERITY_LABELS: Record<Severity, string> = {
  1: "Mild",
  2: "Moderate",
  3: "Strong",
  4: "Extreme",
};
