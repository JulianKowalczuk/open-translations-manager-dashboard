import {
  createStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import produce from 'immer';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { EditableText } from 'app/components/forms';
import EditablePhraseCategoriesChips from 'app/modules/phrases/components/EditablePhraseCategoriesChips';
import PhraseValuesForm from 'app/modules/phrases/components/PhraseValuesForm';
import { createPhraseAction } from 'app/modules/phrases/phrasesStore';
import { Phrase, PhraseValues } from 'app/modules/phrases/phrasesTypes';
import { PhrasesCategoriesMap } from 'app/modules/phrasesCategories';
import { GlobalState } from 'app/types';

const notNameColor = grey[700];

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing.unit / 4
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    nameCell: {
      fontSize: 16,
      width: 250
    },
    notNameText: {
      color: notNameColor
    },
    phraseCategoriesGridItem: {
      flexGrow: 1
    }
  });

type Props = WithStyles<typeof styles> & {
  isEditing: boolean;
  onChange: (phrase: Phrase) => void;
  phrase: Phrase;
  phrasesCategories: PhrasesCategoriesMap;
  renderActionsButtons: () => React.ReactNode;
};

type State = {
  isPanelExpanded: boolean;
};

class PhrasesTableRow extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      isPanelExpanded: false
    };

    this.handleExpansionPanelChange = this.handleExpansionPanelChange.bind(this);
    this.changePhraseTextValue = this.changePhraseTextValue.bind(this);
    this.handlePhraseCategoriesChange = this.handlePhraseCategoriesChange.bind(this);
    this.handlePhraseCommentChange = this.handlePhraseCommentChange.bind(this);
    this.handlePhraseNameChange = this.handlePhraseNameChange.bind(this);
    this.handlePhraseValuesChange = this.handlePhraseValuesChange.bind(this);
  }

  handleExpansionPanelChange(_: React.ChangeEvent<{}>, expanded: boolean) {
    this.setState({ isPanelExpanded: this.props.isEditing || expanded });
  }

  changePhraseTextValue(e: React.ChangeEvent<HTMLInputElement>, phraseKey: keyof Phrase) {
    const { value } = e.target;
    const { onChange, phrase } = this.props;

    onChange(
      produce(phrase, draft => {
        draft[phraseKey] = value;
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
    const { onChange, phrase } = this.props;

    onChange(
      produce(phrase, draft => {
        draft.categoriesIds = categoriesIds;
      })
    );
  }

  handlePhraseValuesChange(values: PhraseValues) {
    const { onChange, phrase } = this.props;

    onChange(
      produce(phrase, draft => {
        draft.values = values;
      })
    );
  }

  render() {
    const { classes, isEditing, phrase, renderActionsButtons } = this.props;

    return (
      <ExpansionPanel
        expanded={this.state.isPanelExpanded}
        onChange={this.handleExpansionPanelChange}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container={true} item={true} spacing={16}>
            <Grid item={true} md={4}>
              <EditableText
                autoFocus={true}
                isEditing={isEditing}
                onChange={this.handlePhraseNameChange}
                placeholder="Name"
                value={phrase.name || ''}
              />
            </Grid>

            <Grid item={true} md={8}>
              <EditableText
                color={notNameColor}
                isEditing={isEditing}
                onChange={this.handlePhraseCommentChange}
                placeholder="Comment"
                value={phrase.comment || ''}
              />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container={true}>
            <Grid container={true} item={true}>
              <PhraseValuesForm
                color={notNameColor}
                isEditing={isEditing}
                values={phrase.values}
                onChange={this.handlePhraseValuesChange}
              />
            </Grid>

            <Grid
              container={true}
              item={true}
              justify="space-between"
              alignItems="center"
              spacing={16}
            >
              <Grid className={classes.phraseCategoriesGridItem} item={true}>
                <EditablePhraseCategoriesChips
                  isEditing={isEditing}
                  value={phrase.categoriesIds}
                  onChange={this.handlePhraseCategoriesChange}
                />
              </Grid>

              <Grid item={true}>{renderActionsButtons()}</Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default connect(
  null,
  (dispatch: ThunkDispatch<GlobalState, void, Action>) => ({
    createPhrase: (phrase: Phrase) => {
      dispatch(createPhraseAction(phrase));
    }
  })
)(withStyles(styles)(PhrasesTableRow));
