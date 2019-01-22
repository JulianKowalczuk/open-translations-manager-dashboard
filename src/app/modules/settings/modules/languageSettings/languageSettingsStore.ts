import produce from 'immer';
import { SetLanguagesCodesMap } from 'app/types';

const TOGGLE = 'settings/language/TOGGLE';
const ADD = 'settings/language/ADD';
const REMOVE = 'settings/language/REMOVE';

export type ToggleLanguageAction = {
  type: typeof TOGGLE;
  code: string;
};

export type AddLanguageAction = {
  type: typeof ADD;
  code: string;
};

export type RemoveLanguageAction = {
  type: typeof REMOVE;
  code: string;
};

type Action = ToggleLanguageAction | AddLanguageAction | RemoveLanguageAction;

export type LanguageSettingsState = {
  setLanguagesCodes: SetLanguagesCodesMap;
};

const initialState: LanguageSettingsState = {
  setLanguagesCodes: {
    en: true,
    pl: true,
    sv: false
  }
};

export function languageSettingsReducer(
  state = initialState,
  action: Action
): LanguageSettingsState {
  return produce(state, draft => {
    switch (action.type) {
      case TOGGLE:
        draft.setLanguagesCodes[action.code] = !draft.setLanguagesCodes[action.code];
        break;

      case ADD:
        draft.setLanguagesCodes[action.code] = true;
        break;

      case REMOVE:
        delete draft.setLanguagesCodes[action.code];
    }
  });
}

export function toggleLanguage(code: string): ToggleLanguageAction {
  return { type: TOGGLE, code };
}

export function addLanguage(code: string): AddLanguageAction {
  return { type: ADD, code };
}

export function removeLanguage(code: string): RemoveLanguageAction {
  return { type: REMOVE, code };
}
