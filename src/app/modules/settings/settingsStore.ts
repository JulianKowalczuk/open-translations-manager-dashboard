import { combineReducers, Reducer } from 'redux';

import { languageSettingsReducer as language } from './modules/languageSettings';
import { LanguageSettingsState } from './modules/languageSettings/languageSettingsStore';

export type SettingsState = {
  language: LanguageSettingsState;
};

export const settingsReducer: Reducer<SettingsState> = combineReducers({
  language
});
