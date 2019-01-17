import {
  createStyles,
  Grid,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';

import { getPhrasesGroupedByTranslatedState } from 'modules/phrases/phrasesMemoizers';
import { GlobalState, SetLanguagesCodesMap } from 'types';
import { PhrasesMap } from '../phrasesStore';
import { Phrase } from '../phrasesTypes';
import PhrasesSearchBar from './PhrasesSearchBar';
import PhrasesTable from './PhrasesTable/PhrasesTable';

const styles = (theme: Theme) =>
  createStyles({
    paperPanel: {
      marginBottom: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 3
    }
  });

type Props = WithStyles<typeof styles> & {
  fetchPhrases: VoidFunction;
  phrases: PhrasesMap;
  setLanguagesCodes: SetLanguagesCodesMap;
};

type State = {
  searchValue: string;
};

class PhrasesPanel extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchValue: ''
    };

    this.filterPhrasesBySearchValue = this.filterPhrasesBySearchValue.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
  }

  filterPhrasesBySearchValue(phrase: Phrase) {
    return phrase.name.includes(this.state.searchValue);
  }

  handleSearchValueChange(searchValue: string) {
    this.setState({ searchValue });
  }

  render() {
    const { classes, phrases, setLanguagesCodes } = this.props;

    if (!Object.values(setLanguagesCodes).includes(true)) {
      return (
        <Paper className={classes.paperPanel}>
          <Typography color="error" variant="h5">
            No languages set
          </Typography>
        </Paper>
      );
    }

    const {
      untranslatedPhrases: unfilteredUntranslatedPhrases,
      translatedPhrases: unfilteredTranslatedPhrases
    } = getPhrasesGroupedByTranslatedState(phrases, setLanguagesCodes);

    let untranslatedPhrases = unfilteredUntranslatedPhrases;
    let translatedPhrases = unfilteredTranslatedPhrases;

    if (this.state.searchValue) {
      untranslatedPhrases = unfilteredUntranslatedPhrases.filter(this.filterPhrasesBySearchValue);
      translatedPhrases = unfilteredTranslatedPhrases.filter(this.filterPhrasesBySearchValue);
    }

    return (
      <Grid container={true} direction="column" spacing={16}>
        <Grid item={true}>
          <PhrasesSearchBar onChange={this.handleSearchValueChange} />
        </Grid>

        <Grid item={true}>
          {Boolean(untranslatedPhrases.length) && (
            <PhrasesTable header="Untranslated" phrases={untranslatedPhrases} />
          )}
        </Grid>

        <Grid item={true}>
          {Boolean(translatedPhrases.length) && (
            <PhrasesTable header="Translated" phrases={translatedPhrases} />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default connect((state: GlobalState) => ({
  phrases: state.phrases.allPhrases,
  setLanguagesCodes: state.settings.language.setLanguagesCodes
}))(withStyles(styles)(PhrasesPanel));
