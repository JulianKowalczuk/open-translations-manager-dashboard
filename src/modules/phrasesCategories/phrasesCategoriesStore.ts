import produce from 'immer';
import { ThunkAction } from 'redux-thunk';

import { GlobalState } from 'types';
import * as phrasesCategoriesAPI from './phrasesCategoriesAPI';
import { PhraseCategory, PhrasesCategoriesMap } from './phrasesCategoriesTypes';

const FETCH = 'phrasesCategories/FETCH';

export type PhrasesCategoriesState = {
  all: PhrasesCategoriesMap;
};

export type FetchPhraseCategoriesAction = {
  type: typeof FETCH;
  phrasesCategories: PhrasesCategoriesMap;
};

const initialState: PhrasesCategoriesState = {
  all: {}
};

export function phrasesCategoriesReducer(
  state = initialState,
  action: FetchPhraseCategoriesAction
) {
  return produce(state, draft => {
    switch (action.type) {
      case FETCH:
        draft.all = action.phrasesCategories;
    }
  });
}

export function fetchPhrasesCategoriesAction(): ThunkAction<
  Promise<void>,
  GlobalState,
  void,
  FetchPhraseCategoriesAction
> {
  return dispatch => {
    return phrasesCategoriesAPI.fetchPhrasesCategories().then(({ err, data }) => {
      if (err) {
        return;
      }

      const phrasesCategories = data.reduce<PhrasesCategoriesMap>((reduced, phraseCategory) => {
        reduced[phraseCategory.id] = phraseCategory.name;
        return reduced;
      }, {});

      dispatch({ type: FETCH, phrasesCategories });
    });
  };
}

export function createPhraseCategoryAction(
  name: string
): ThunkAction<Promise<void>, GlobalState, void, FetchPhraseCategoriesAction> {
  return dispatch => {
    return phrasesCategoriesAPI.createPhraseCategory(name).then(({ err }) => {
      if (err) {
        return;
      }

      return dispatch(fetchPhrasesCategoriesAction());
    });
  };
}

export function updatePhraseCategoryAction(
  phraseCategory: PhraseCategory
): ThunkAction<Promise<void>, GlobalState, void, FetchPhraseCategoriesAction> {
  return dispatch => {
    return phrasesCategoriesAPI.updatePhraseCategory(phraseCategory).then(({ err }) => {
      if (err) {
        return;
      }

      return dispatch(fetchPhrasesCategoriesAction());
    });
  };
}

export function deletePhraseCategoryAction({
  id
}: PhraseCategory): ThunkAction<Promise<void>, GlobalState, void, FetchPhraseCategoriesAction> {
  return dispatch => {
    return phrasesCategoriesAPI.deletePhraseCategory(id).then(({ err }) => {
      if (err) {
        return;
      }

      return dispatch(fetchPhrasesCategoriesAction());
    });
  };
}
