import { Chip, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import { GlobalState, SetLanguagesCodesMap } from 'types';
import { getPhrasesGroupedByTranslatedState } from '../phrasesMemoizers';
import { PhrasesMap } from '../phrasesStore';

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      color: theme.palette.primary[600],
      fontWeight: 'bold',
      marginLeft: theme.spacing.unit
    },
    container: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    lightRedBackground: {
      backgroundColor: theme.palette.error[600],
      color: theme.palette.background.paper
    }
  });

type Props = WithStyles<typeof styles> & {
  phrases: PhrasesMap;
  setLanguagesCodes: SetLanguagesCodesMap;

  className?: string;
};

function TranslatedPhrasesCounter({ className, classes, phrases, setLanguagesCodes }: Props) {
  const phrasesCount = Object.keys(phrases).length;
  const { translatedPhrases } = getPhrasesGroupedByTranslatedState(phrases, setLanguagesCodes);

  return (
    <Typography className={cx(classes.container, className)} color="inherit" variant="h6">
      Translated
      <Chip
        className={cx(
          classes.chip,
          translatedPhrases.length !== phrasesCount && classes.lightRedBackground
        )}
        label={`${translatedPhrases.length}/${phrasesCount}`}
      />
    </Typography>
  );
}

export default connect((state: GlobalState) => ({
  phrases: state.phrases.allPhrases,
  setLanguagesCodes: state.settings.language.setLanguagesCodes
}))(withStyles(styles)(TranslatedPhrasesCounter));
