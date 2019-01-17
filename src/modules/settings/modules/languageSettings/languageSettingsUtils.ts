import memoize from 'memoize-one';

import { SetLanguagesCodesMap } from 'types';

export const getActiveSetLanguagesCodes = memoize((setLanguagesCodes: SetLanguagesCodesMap) =>
  Object.entries(setLanguagesCodes)
    .filter(([, isCodeUsed]) => isCodeUsed)
    .map(([code]) => code)
);
