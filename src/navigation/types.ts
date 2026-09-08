export type TabParamList = {
  Today: undefined;
  Browse: undefined;
  Search: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  WordDetail: { wordId: string };
};

export type AppParamList = TabParamList & RootStackParamList;
