import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer as app } from 'modules/app';
import { phrasesReducer as phrases } from 'modules/phrases/phrasesStore';
import { phrasesCategoriesReducer as phrasesCategories } from 'modules/phrasesCategories/phrasesCategoriesStore';
import { settingsReducer as settings } from 'modules/settings';

/* tslint:disable:interface-name */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}
/* tslint:enable:interface-name */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    app,
    phrases,
    phrasesCategories,
    settings
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
