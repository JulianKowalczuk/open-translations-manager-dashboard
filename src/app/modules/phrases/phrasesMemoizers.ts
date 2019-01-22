import memoize from 'memoize-one';

import { SetLanguagesCodesMap } from 'app/types';
import { PhrasesMap } from './phrasesStore';
import { Phrase } from './phrasesTypes';

export const getPhrasesGroupedByTranslatedState = memoize(
  (phrases: PhrasesMap, setLanguagesCodes: SetLanguagesCodesMap) => {
    const translatedPhrases: Phrase[] = [];
    const untranslatedPhrases: Phrase[] = [];

    Object.values(phrases).forEach(phrase => {
      (Object.entries(setLanguagesCodes).every(
        ([langCode, isCodeUsed]) => !isCodeUsed || phrase.values.hasOwnProperty(langCode)
      )
        ? translatedPhrases
        : untranslatedPhrases
      ).push(phrase);
    });

    return { translatedPhrases, untranslatedPhrases };
  }
);
