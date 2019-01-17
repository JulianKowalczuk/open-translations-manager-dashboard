import { CssBaseline, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { hot } from 'react-hot-loader';

import { CreatePhraseModal, PhrasesPanel } from 'modules/phrases';
import { fetchPhrasesAction, FetchPhrasesAction } from 'modules/phrases/phrasesStore';
import {
  FetchPhraseCategoriesAction,
  fetchPhrasesCategoriesAction
} from 'modules/phrasesCategories/phrasesCategoriesStore';
import { SettingsDrawer } from 'modules/settings';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { GlobalState } from 'types';
import { Navbar } from './components';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexFlow: 'column',
      height: '100vh'
    },
    contentContainer: {
      backgroundColor: grey[200],
      flex: '1 1 auto',
      padding: theme.spacing.unit * 2
    }
  });

type Props = WithStyles<typeof styles> & {
  fetchPhrases: VoidFunction;
  fetchPhrasesCategories: VoidFunction;
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPhrasesCategories();
    this.props.fetchPhrases();
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />

        <div className={classes.container}>
          <Navbar />

          <div className={classes.contentContainer}>
            <PhrasesPanel />
          </div>

          <SettingsDrawer />

          <CreatePhraseModal />
        </div>
      </React.Fragment>
    );
  }
}

export default hot(module)(
  connect(
    null,
    (
      dispatch: ThunkDispatch<GlobalState, void, FetchPhrasesAction | FetchPhraseCategoriesAction>
    ) => ({
      fetchPhrases: () => {
        dispatch(fetchPhrasesAction());
      },
      fetchPhrasesCategories: () => {
        dispatch(fetchPhrasesCategoriesAction());
      }
    })
  )(withStyles(styles)(App))
);
