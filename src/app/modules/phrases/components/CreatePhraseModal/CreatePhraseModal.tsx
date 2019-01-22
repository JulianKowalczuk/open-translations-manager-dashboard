import { FormControlLabel, Modal, Paper, Switch, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';

import {
  setShouldModalCloseAfterPhraseCreationAction,
  toggleCreatePhraseModalVisibilityAction
} from 'app/modules/app/appStore';
import { GlobalState } from 'app/types';
import CreatePhrasePanel from './CreatePhrasePanel';

const styles = (theme: Theme) =>
  createStyles({
    closeAfterCreationFormControl: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit
    },
    modalRootOverride: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    paperPanel: {
      margin: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 10,
      padding: theme.spacing.unit * 3,
      position: 'relative'
    }
  });

type Props = WithStyles<typeof styles> & {
  isCreatePhraseModalVisible: boolean;
  shouldModalCloseAfterPhraseCreation: boolean;
  handleCloseOnCreateSwitchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleCreatePhraseModalVisibility: () => void;
};

function CreatePhraseModal({
  classes,
  isCreatePhraseModalVisible,
  shouldModalCloseAfterPhraseCreation,
  handleCloseOnCreateSwitchChange,
  toggleCreatePhraseModalVisibility
}: Props) {
  return (
    <Modal
      classes={{ root: classes.modalRootOverride }}
      open={isCreatePhraseModalVisible}
      onClose={toggleCreatePhraseModalVisibility}
    >
      <Paper className={classes.paperPanel}>
        <Typography variant="h4">Create phrase</Typography>

        <CreatePhrasePanel onCancel={toggleCreatePhraseModalVisibility} />

        <FormControlLabel
          className={classes.closeAfterCreationFormControl}
          control={
            <Switch
              checked={shouldModalCloseAfterPhraseCreation}
              onChange={handleCloseOnCreateSwitchChange}
              color="primary"
            />
          }
          label="Should close after creation"
        />
      </Paper>
    </Modal>
  );
}

export default connect(
  (state: GlobalState) => ({
    isCreatePhraseModalVisible: state.app.isCreatePhraseModalVisible,
    shouldModalCloseAfterPhraseCreation: state.app.shouldModalCloseAfterPhraseCreation
  }),
  dispatch => ({
    handleCloseOnCreateSwitchChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setShouldModalCloseAfterPhraseCreationAction(e.target.checked));
    },
    toggleCreatePhraseModalVisibility: () => {
      dispatch(toggleCreatePhraseModalVisibilityAction());
    }
  })
)(withStyles(styles)(CreatePhraseModal));
