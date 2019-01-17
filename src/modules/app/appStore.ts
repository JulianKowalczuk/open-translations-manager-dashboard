import produce from 'immer';

const SET_SHOULD_MODAL_CLOSE_AFTER_PHRASE_CREATION =
  'app/SET_SHOULD_MODAL_CLOSE_AFTER_PHRASE_CREATION';
const TOGGLE_CREATE_PHRASE_MODAL_VISIBILITY = 'app/TOGGLE_CREATE_PHRASE_MODAL_VISIBILITY';
const TOGGLE_SETTINGS_DRAWER_VISIBILITY = 'app/TOGGLE_SETTINGS_DRAWER_VISIBILITY';

export type SetShouldModalCloseAfterPhraseCreationAction = {
  type: typeof SET_SHOULD_MODAL_CLOSE_AFTER_PHRASE_CREATION;
  shouldClose: boolean;
};

export type ToggleCreatePhraseModalVisibilityAction = {
  type: typeof TOGGLE_CREATE_PHRASE_MODAL_VISIBILITY;
};

export type ToggleSettingsDrawerVisibilityAction = {
  type: typeof TOGGLE_SETTINGS_DRAWER_VISIBILITY;
};

type Action =
  | SetShouldModalCloseAfterPhraseCreationAction
  | ToggleCreatePhraseModalVisibilityAction
  | ToggleSettingsDrawerVisibilityAction;

export type AppState = {
  isCreatePhraseModalVisible: boolean;
  isSettingsDrawerVisible: boolean;
  shouldModalCloseAfterPhraseCreation: boolean;
};

const initialState: AppState = {
  isCreatePhraseModalVisible: false,
  isSettingsDrawerVisible: false,
  shouldModalCloseAfterPhraseCreation: true
};

export function appReducer(state = initialState, action: Action): AppState {
  return produce(state, draft => {
    switch (action.type) {
      case SET_SHOULD_MODAL_CLOSE_AFTER_PHRASE_CREATION:
        draft.shouldModalCloseAfterPhraseCreation = action.shouldClose;
        break;

      case TOGGLE_CREATE_PHRASE_MODAL_VISIBILITY:
        draft.isCreatePhraseModalVisible = !draft.isCreatePhraseModalVisible;
        break;

      case TOGGLE_SETTINGS_DRAWER_VISIBILITY:
        draft.isSettingsDrawerVisible = !draft.isSettingsDrawerVisible;
        break;
    }
  });
}

export function setShouldModalCloseAfterPhraseCreationAction(
  shouldClose: boolean
): SetShouldModalCloseAfterPhraseCreationAction {
  return { type: SET_SHOULD_MODAL_CLOSE_AFTER_PHRASE_CREATION, shouldClose };
}

export function toggleCreatePhraseModalVisibilityAction(): ToggleCreatePhraseModalVisibilityAction {
  return { type: TOGGLE_CREATE_PHRASE_MODAL_VISIBILITY };
}

export function toggleSettingsDrawerVisibilityAction(): ToggleSettingsDrawerVisibilityAction {
  return { type: TOGGLE_SETTINGS_DRAWER_VISIBILITY };
}
