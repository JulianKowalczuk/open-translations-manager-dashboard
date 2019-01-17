import {
  Button,
  ClickAwayListener,
  createStyles,
  DialogActions,
  DialogTitle,
  Fade,
  Paper,
  Popper,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing.unit,
      padding: theme.spacing.unit
    }
  });

type Props = WithStyles<typeof styles> & {
  isOpen: boolean;
  message: string;
  onConfirm: VoidFunction;
  onDeny: VoidFunction;

  confirmLabel?: string;
  denyLabel?: string;
  anchorEl?: null | HTMLElement;
};

function DecisionPopper({
  classes,
  isOpen,
  message,
  onConfirm,
  onDeny,
  confirmLabel = 'Confirm',
  denyLabel = 'Cancel',
  anchorEl
}: Props) {
  return (
    <Popper open={isOpen} anchorEl={anchorEl} transition={true}>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <ClickAwayListener onClickAway={onDeny}>
            <Paper className={classes.paper}>
              <DialogTitle>{message}</DialogTitle>

              <DialogActions>
                <Button onClick={onConfirm} color="primary">
                  {confirmLabel}
                </Button>

                <Button onClick={onDeny} color="primary">
                  {denyLabel}
                </Button>
              </DialogActions>
            </Paper>
          </ClickAwayListener>
        </Fade>
      )}
    </Popper>
  );
}

export default withStyles(styles)(DecisionPopper);
