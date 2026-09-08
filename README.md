# Curse Word of the Day

A mobile app (iOS + Android) that teaches you a curse word a day, organized by **language and region of the world** — because profanity isn't one-size-fits-all. The same language can swear completely differently depending on where it's spoken (Québécois French curses through Catholic liturgy; Argentine Spanish turns an innocent Spain word into something obscene), and this app is built around that.

Built with [Expo](https://expo.dev) (React Native + TypeScript).

## Features (v1)

- **Today** — a new word of the day, picked deterministically by date so everyone sees the same word.
- **Browse** — drill down by language, then country/dialect (skipped automatically for languages spoken in only one place, like Tagalog or Japanese). Languages, countries, and words are all listed alphabetically.
- **Search** — find a word by its native script, a romanized guess, or by language/region name.
- **Favorites** — save words locally on your device, listed alphabetically.
- **Settings** — daily reminder notification, a severity filter to hide the most extreme entries.

Every entry includes the word in its native script, pronunciation, literal meaning, real-world usage/connotation, and etymology/origin — this app is meant to be a language and culture reference, not just a shock-value list.

Currently covers 26 languages across 39 language/region pairs: Arabic (Egyptian, Levantine), Chinese (Mandarin, Cantonese), Dutch, English (Medieval, Early Modern, United States, United Kingdom, Ireland), French (France, Québec), German (Germany, Austria, Switzerland), Hindi, Irish (Gaeilge), Italian, Japanese, Korean, Mongolian, Navajo, Polish, Portuguese (Brazil, Portugal), Russian, Spanish (Mexico, Spain, Argentina, Chile, Colombia), Swahili, Tagalog, Thai, Tibetan, Turkish, Urdu, Vietnamese, and Yoruba.

## Content sourcing

All word entries (definitions, etymology, usage notes) are written in original language for this app based on general/public linguistic knowledge, not copied from any dictionary, wiki, or article. Individual words and short phrases are not copyrightable in the first place, but the descriptive text around each one is authored fresh rather than reproduced from any source.

Tab bar icons are from [Keyline Icons](https://keylineicons.com) ([MIT licensed](https://github.com/keyline-icons/keyline-icons)), stroke/outline style.

## Getting started

```bash
npm install
npx expo start
```

Then open the project in Expo Go on your phone, or run an iOS/Android simulator.

## Tech stack

- Expo (managed workflow) + TypeScript
- React Navigation (bottom tabs + native stack)
- AsyncStorage (favorites, settings, disclaimer state — all on-device, no backend)
- Fuse.js (fuzzy search across native-script and romanized terms)
- expo-notifications (daily reminder)
- react-native-svg (tab bar icons) + react-native-safe-area-context

## Project status

Early development. See the in-repo plan for full scope and platform-store compliance notes.
