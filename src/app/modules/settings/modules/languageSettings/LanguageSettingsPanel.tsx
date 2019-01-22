import {
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { connect } from 'react-redux';

import { FlagIcon } from 'app/components';
import { GlobalState, LanguagesEnum, SetLanguagesCodesMap } from 'app/types';
import { toggleLanguage } from './languageSettingsStore';

const styles = createStyles({
  listItemText: {
    paddingRight: 30
  }
});

type Props = WithStyles<typeof styles> & {
  setLanguagesCodes: SetLanguagesCodesMap;
  toggleSetCode: (code: string) => void;
};

/* tslint:disable:jsx-no-lambda */
function LanguageSettingsPanel({ classes, setLanguagesCodes, toggleSetCode }: Props) {
  return (
    <React.Fragment>
      <Typography variant="h5">Languages</Typography>

      <List>
        {Object.entries(LanguagesEnum).map(([name, code]) => (
          <ListItem button={true} key={code}>
            <ListItemIcon>
              <FlagIcon code={code} size="2x" />
            </ListItemIcon>

            <ListItemText className={classes.listItemText}>{name}</ListItemText>

            <ListItemSecondaryAction>
              <Checkbox
                checked={setLanguagesCodes[code]}
                onChange={() => {
                  toggleSetCode(code);
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default connect(
  (state: GlobalState) => ({
    setLanguagesCodes: state.settings.language.setLanguagesCodes
  }),
  dispatch => ({
    toggleSetCode: (code: string) => {
      dispatch(toggleLanguage(code));
    }
  })
)(withStyles(styles)(LanguageSettingsPanel));
