import { AppState } from 'app/modules/app/appStore';
import { PhrasesState } from 'app/modules/phrases/phrasesStore';
import { PhrasesCategoriesState } from 'app/modules/phrasesCategories/phrasesCategoriesStore';
import { SettingsState } from 'app/modules/settings/settingsStore';

type GlobalState = {
  app: AppState;
  phrases: PhrasesState;
  phrasesCategories: PhrasesCategoriesState;
  settings: SettingsState;
};

export default GlobalState;
