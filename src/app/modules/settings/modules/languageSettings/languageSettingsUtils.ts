import memoize from 'memoize-one';

import { SetLanguagesCodesMap } from 'app/types';

export const getActiveSetLanguagesCodes = memoize((setLanguagesCodes: SetLanguagesCodesMap) =>
  Object.entries(setLanguagesCodes)
    .filter(([, isCodeUsed]) => isCodeUsed)
    .map(([code]) => code)
);
