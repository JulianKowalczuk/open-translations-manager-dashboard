import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import cx from 'classnames';
import * as React from 'react';
import FlagIconFactory, { FlagIconProps } from 'react-flag-icon-css';

const NativeFlagIcon = FlagIconFactory(React, { useCssModules: false });

const styles = createStyles({
  disabledFlagIcon: {
    opacity: 0.3
  },
  flagIcon: {
    height: '0.98rem',
    width: '1.25rem'
  }
});

type Props = WithStyles<typeof styles> &
  FlagIconProps & {
    isDisabled?: boolean;
  };

function FlagIcon({ className, classes, code, size, isDisabled }: Props) {
  return (
    <NativeFlagIcon
      className={cx(classes.flagIcon, isDisabled && classes.disabledFlagIcon, className)}
      code={code === 'en' ? 'gb' : code}
      size={size}
    />
  );
}

export default withStyles(styles)(FlagIcon);
