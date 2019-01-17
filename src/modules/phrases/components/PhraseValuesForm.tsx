import { createStyles, Grid, withStyles, WithStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { FlagIcon } from 'components';
import { EditableText } from 'components/forms';
import produce from 'immer';
import { PhraseValues } from 'modules/phrases/phrasesTypes';
import { languageSettingsUtils } from 'modules/settings/modules/languageSettings';
import * as React from 'react';
import { connect } from 'react-redux';
import { GlobalState, SetLanguagesCodesMap } from 'types';

const styles = createStyles({
  container: {
    width: '100%'
  },
  fieldWrapper: {
    height: 33,
    marginBottom: 8
  },
  flag: {
    border: `1px solid ${grey[300]}`,
    margin: '0.35em 0.4em 0 0'
  }
});

type Props = WithStyles<typeof styles> & {
  isEditing: boolean;
  onChange: (values: PhraseValues) => void;
  setLanguagesCodes: SetLanguagesCodesMap;
  values: PhraseValues;

  autoFocusFirstField?: boolean;
  color?: string;
};

class PhraseValuesForm extends React.Component<Props> {
  getValueChangeHandler(langCode: string) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const { values, onChange } = this.props;

      const nextPhrase = produce(values, draft => {
        if (value) {
          draft[langCode] = value;
        } else {
          delete draft[langCode];
        }
      });

      onChange(nextPhrase);
    };
  }

  render() {
    const {
      classes,
      color,
      autoFocusFirstField,
      isEditing,
      values = {},
      setLanguagesCodes
    } = this.props;

    return (
      <form className={classes.container}>
        {languageSettingsUtils
          .getActiveSetLanguagesCodes(setLanguagesCodes)
          .map((langCode, index) => (
            <Grid
              className={classes.fieldWrapper}
              container={true}
              justify="flex-start"
              key={langCode}
            >
              <Grid item={true}>
                <FlagIcon className={classes.flag} code={langCode} isDisabled={!values[langCode]} />
              </Grid>

              <Grid item={true} style={{ flexGrow: 1 }}>
                <EditableText
                  color={color}
                  autoFocus={autoFocusFirstField && !index}
                  isEditing={isEditing}
                  value={values[langCode] || ''}
                  onChange={this.getValueChangeHandler(langCode)}
                />
              </Grid>
            </Grid>
          ))}
      </form>
    );
  }
}

export default connect((state: GlobalState) => ({
  setLanguagesCodes: state.settings.language.setLanguagesCodes
}))(withStyles(styles)(PhraseValuesForm));
