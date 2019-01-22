import { Drawer } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';

import { toggleSettingsDrawerVisibilityAction } from 'app/modules/app/appStore';
import { GlobalState } from 'app/types';
import SettingsPanel from './SettingsPanel';

const styles = (theme: Theme) =>
  createStyles({
    settingsDrawerWrapper: {
      padding: theme.spacing.unit * 2
    }
  });

type Props = WithStyles<typeof styles> & {
  isSettingsDrawerVisible: boolean;
  handleDrawerToggleAction: () => void;
};

function SettingsDrawer({ classes, isSettingsDrawerVisible, handleDrawerToggleAction }: Props) {
  return (
    <Drawer anchor="right" open={isSettingsDrawerVisible} onClose={handleDrawerToggleAction}>
      <div className={classes.settingsDrawerWrapper}>
        <SettingsPanel />
      </div>
    </Drawer>
  );
}

export default connect(
  (state: GlobalState) => ({
    isSettingsDrawerVisible: state.app.isSettingsDrawerVisible
  }),
  dispatch => ({
    handleDrawerToggleAction: () => {
      dispatch(toggleSettingsDrawerVisibilityAction());
    }
  })
)(withStyles(styles)(SettingsDrawer));
