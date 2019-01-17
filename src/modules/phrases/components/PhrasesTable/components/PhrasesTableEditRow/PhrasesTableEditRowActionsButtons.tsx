import { createStyles, IconButton, Theme, withStyles, WithStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    deleteIconButton: {
      '&:hover': {
        backgroundColor: red[400],
        color: '#fff'
      }
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    },
    saveIconButton: {
      '&:hover': {
        backgroundColor: green[400],
        color: '#fff'
      }
    }
  });

type Props = WithStyles<typeof styles> & {
  isEditing: boolean;
  onCancelClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSaveClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function PhrasesTableEditRowActionsButtons({
  classes,
  isEditing,
  onCancelClick,
  onDeleteClick,
  onEditClick,
  onSaveClick
}: Props) {
  if (isEditing) {
    return (
      <div>
        <IconButton className={classes.saveIconButton} onClick={onSaveClick}>
          <SaveIcon />
        </IconButton>

        <IconButton className={classes.rightIcon} onClick={onCancelClick}>
          <CloseIcon />
        </IconButton>
      </div>
    );
  }

  return (
    <div>
      <IconButton className={classes.deleteIconButton} onClick={onDeleteClick}>
        <DeleteIcon />
      </IconButton>

      <IconButton className={classes.rightIcon} onClick={onEditClick}>
        <EditIcon />
      </IconButton>
    </div>
  );
}

export default withStyles(styles)(PhrasesTableEditRowActionsButtons);
