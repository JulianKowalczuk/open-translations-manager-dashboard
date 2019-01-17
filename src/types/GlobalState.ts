import { AppState } from 'modules/app/appStore';
import { PhrasesState } from 'modules/phrases/phrasesStore';
import { PhrasesCategoriesState } from 'modules/phrasesCategories/phrasesCategoriesStore';
import { SettingsState } from 'modules/settings/settingsStore';

type GlobalState = {
  app: AppState;
  phrases: PhrasesState;
  phrasesCategories: PhrasesCategoriesState;
  settings: SettingsState;
};

export default GlobalState;
