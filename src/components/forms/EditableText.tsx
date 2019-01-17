import { createStyles, TextField, Typography, withStyles, WithStyles } from '@material-ui/core';
import cx from 'classnames';
import * as React from 'react';

const styles = createStyles({
  container: {
    height: 33,
    width: '100%'
  },
  text: {
    display: 'block',
    fontSize: 16,
    lineHeight: '1.1875em',
    paddingTop: '0.38em'
  }
});

type Props = WithStyles<typeof styles> & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string | number;

  autoFocus?: boolean;
  className?: string;
  color?: string;
  isEditing?: boolean;
  placeholder?: string;
};

function EditableText({
  onChange,
  value,
  autoFocus,
  classes,
  className,
  color,
  isEditing,
  placeholder = 'Enter value...'
}: Props) {
  const style = color ? { color } : undefined;

  return (
    <div className={cx(classes.container, className)}>
      {isEditing ? (
        <TextField
          autoFocus={autoFocus}
          fullWidth={true}
          onChange={onChange}
          placeholder={placeholder}
          style={style}
          value={value}
        />
      ) : (
        <Typography className={classes.text} noWrap={true} style={style}>
          {value}
        </Typography>
      )}
    </div>
  );
}

export default withStyles(styles)(EditableText);
