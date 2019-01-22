import {
  Button,
  createStyles,
  Grid,
  TextField,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import produce from 'immer';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { createPhraseAction } from 'app/modules/phrases/phrasesStore';
import { PhraseValues, PhraseWithoutId } from 'app/modules/phrases/phrasesTypes';
import { GlobalState } from 'app/types';
import EditablePhraseCategoriesChips from '../EditablePhraseCategoriesChips';
import PhraseValuesForm from '../PhraseValuesForm';

const styles = (theme: Theme) =>
  createStyles({
    cancelButton: {
      marginLeft: theme.spacing.unit
    },
    fullWidth: {
      width: '100%'
    }
  });

type Props = WithStyles<typeof styles> & {
  createPhrase: (phrase: PhraseWithoutId) => void;
  onCancel: VoidFunction;
};

class CreatePhrasePanel extends React.Component<Props, PhraseWithoutId> {
  constructor(props: any) {
    super(props);

    this.state = {
      categoriesIds: [],
      name: '',
      values: {}
    };

    this.changePhraseTextValue = this.changePhraseTextValue.bind(this);
    this.handlePhraseCommentChange = this.handlePhraseCommentChange.bind(this);
    this.handlePhraseNameChange = this.handlePhraseNameChange.bind(this);
    this.handlePhraseCategoriesChange = this.handlePhraseCategoriesChange.bind(this);
    this.handlePhraseValuesChange = this.handlePhraseValuesChange.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
  }

  changePhraseTextValue(
    e: React.ChangeEvent<HTMLInputElement>,
    phraseWithoutIdKey: keyof PhraseWithoutId
  ) {
    const { value } = e.target;

    this.setState(
      produce((draft: PhraseWithoutId) => {
        draft[phraseWithoutIdKey] = value;
      })
    );
  }

  handlePhraseCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.changePhraseTextValue(e, 'comment');
  }

  handlePhraseNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.changePhraseTextValue(e, 'name');
  }

  handlePhraseCategoriesChange(categoriesIds: number[]) {
    this.setState(
      produce((draft: PhraseWithoutId) => {
        draft.categoriesIds = categoriesIds;
      })
    );
  }

  handlePhraseValuesChange(values: PhraseValues) {
    this.setState(
      produce((draft: PhraseWithoutId) => {
        draft.values = values;
      })
    );
  }

  handleCreateButtonClick() {
    this.props.createPhrase(this.state);
  }

  render() {
    const { classes, onCancel } = this.props;

    return (
      <Grid container={true} direction="column" alignItems="flex-end" spacing={16}>
        <Grid container={true} item={true} spacing={16}>
          <Grid item={true} md={4}>
            <TextField
              autoFocus={true}
              className={classes.fullWidth}
              label="Name"
              onChange={this.handlePhraseNameChange}
              value={this.state.name}
            />
          </Grid>

          <Grid item={true} md={8}>
            <TextField
              className={classes.fullWidth}
              label="Comment"
              onChange={this.handlePhraseCommentChange}
              value={this.state.comment}
            />
          </Grid>
        </Grid>

        <Grid container={true} item={true}>
          <PhraseValuesForm
            isEditing={true}
            onChange={this.handlePhraseValuesChange}
            values={this.state.values}
          />
        </Grid>

        <Grid container={true} item={true}>
          <EditablePhraseCategoriesChips
            isEditing={true}
            onChange={this.handlePhraseCategoriesChange}
            value={this.state.categoriesIds}
          />
        </Grid>

        <Grid item={true}>
          <Button onClick={this.handleCreateButtonClick}>Create</Button>

          <Button className={classes.cancelButton} onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  null,
  (dispatch: ThunkDispatch<GlobalState, void, Action>) => ({
    createPhrase: (phraseWithoutId: PhraseWithoutId) => {
      dispatch(createPhraseAction(phraseWithoutId));
    }
  })
)(withStyles(styles)(CreatePhrasePanel));
