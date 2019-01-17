export type PhraseValues = {
  [langCode: string]: string;
};

export type PhraseWithoutId = {
  categoriesIds: number[];
  name: string;
  values: PhraseValues;

  comment?: string;
};

export type Phrase = PhraseWithoutId & {
  id: number;
};
