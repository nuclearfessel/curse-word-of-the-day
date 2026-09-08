export type WordDetailParams = { wordId: string };

export type TodayStackParamList = {
  TodayHome: undefined;
  WordDetail: WordDetailParams;
};

export type BrowseStackParamList = {
  Languages: undefined;
  Regions: { language: string };
  Words: { language: string; region: string };
  WordDetail: WordDetailParams;
};

export type SearchStackParamList = {
  SearchHome: undefined;
  WordDetail: WordDetailParams;
};

export type FavoritesStackParamList = {
  FavoritesHome: undefined;
  WordDetail: WordDetailParams;
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
};

export type TabParamList = {
  Today: undefined;
  Browse: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};
