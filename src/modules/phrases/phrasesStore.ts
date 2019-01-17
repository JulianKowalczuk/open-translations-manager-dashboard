import produce from 'immer';
import { ThunkAction } from 'redux-thunk';

import {
  toggleCreatePhraseModalVisibilityAction,
  ToggleCreatePhraseModalVisibilityAction
} from 'modules/app/appStore';
import { GlobalState } from 'types';
import * as phrasesAPI from './phrasesAPI';
import { Phrase, PhraseWithoutId } from './phrasesTypes';

const FETCH = 'phrases/FETCH';

export type PhrasesMap = { [phraseId: number]: Phrase };

export type FetchPhrasesAction = {
  type: typeof FETCH;
  phrases: PhrasesMap;
};

export type PhrasesState = {
  allPhrases: PhrasesMap;
};

const initialState: PhrasesState = {
  allPhrases: {}
};

export function phrasesReducer(state = initialState, action: FetchPhrasesAction): PhrasesState {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH:
        draft.allPhrases = action.phrases;
        break;
    }
  });
}

export function fetchPhrasesAction(): ThunkAction<
  Promise<void>,
  GlobalState,
  void,
  FetchPhrasesAction
> {
  return dispatch => {
    return phrasesAPI.fetchPhrases().then(({ err, data }) => {
      if (err) {
        return;
      }

      const phrases = data.reduce<PhrasesMap>((reduced, phrase) => {
        reduced[phrase.id] = phrase;
        return reduced;
      }, {});

      dispatch({ type: FETCH, phrases });
    });
  };
}

export function createPhraseAction(
  phraseWithoutId: PhraseWithoutId
): ThunkAction<
  Promise<void>,
  GlobalState,
  void,
  FetchPhrasesAction | ToggleCreatePhraseModalVisibilityAction
> {
  return (dispatch, getState) => {
    const {
      app: { isCreatePhraseModalVisible, shouldModalCloseAfterPhraseCreation }
    } = getState();

    return phrasesAPI.createPhrase(phraseWithoutId).then(({ err }) => {
      if (err) {
        return;
      }

      return dispatch(fetchPhrasesAction()).then(() => {
        if (isCreatePhraseModalVisible && shouldModalCloseAfterPhraseCreation) {
          dispatch(toggleCreatePhraseModalVisibilityAction());
        }
      });
    });
  };
}

export function updatePhraseAction(
  phrase: Phrase
): ThunkAction<Promise<void>, GlobalState, void, FetchPhrasesAction> {
  return dispatch => {
    return phrasesAPI.updatePhrase(phrase).then(({ err }) => {
      if (err) {
        return;
      }

      return dispatch(fetchPhrasesAction());
    });
  };
}

export function deletePhraseAction(
  phrase: Phrase
): ThunkAction<Promise<void>, GlobalState, void, FetchPhrasesAction> {
  return dispatch => {
    return phrasesAPI.deletePhrase(phrase.id).then(({ err }) => {
      if (err) {
        return;
      }

      return dispatch(fetchPhrasesAction());
    });
  };
}
