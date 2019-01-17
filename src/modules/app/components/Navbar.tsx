import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import SyncIcon from '@material-ui/icons/Sync';
import * as React from 'react';
import { connect } from 'react-redux';

import { TranslatedPhrasesCounter } from 'modules/phrases';
import {
  toggleCreatePhraseModalVisibilityAction,
  toggleSettingsDrawerVisibilityAction
} from '../appStore';

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    item: {
      marginRight: theme.spacing.unit
    }
  });

type Props = WithStyles<typeof styles> & {
  toggleCreatePhraseModalVisibility: () => void;
  toggleSettingsDrawerVisibility: () => void;
};

function Navbar({
  classes,
  toggleCreatePhraseModalVisibility,
  toggleSettingsDrawerVisibility
}: Props) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography className={classes.grow} color="inherit" variant="h6">
          Open Translations Manager
        </Typography>

        <TranslatedPhrasesCounter className={classes.item} />

        <IconButton
          className={classes.item}
          color="inherit"
          onClick={toggleCreatePhraseModalVisibility}
          aria-label="Add phrase"
        >
          <AddIcon />
        </IconButton>

        <IconButton
          className={classes.item}
          color="inherit"
          onClick={toggleCreatePhraseModalVisibility}
          aria-label="Sync phrases"
        >
          <SyncIcon />
        </IconButton>

        <IconButton color="inherit" onClick={toggleSettingsDrawerVisibility} aria-label="Settings">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default connect(
  null,
  dispatch => ({
    toggleCreatePhraseModalVisibility: () => {
      dispatch(toggleCreatePhraseModalVisibilityAction());
    },
    toggleSettingsDrawerVisibility: () => {
      dispatch(toggleSettingsDrawerVisibilityAction());
    }
  })
)(withStyles(styles)(Navbar));
