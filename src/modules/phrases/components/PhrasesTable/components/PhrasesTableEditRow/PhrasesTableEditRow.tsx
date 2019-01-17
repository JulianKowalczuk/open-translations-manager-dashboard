import * as React from 'react';
import { connect } from 'react-redux';

import { DecisionPopper } from 'components';
import {
  deletePhraseAction,
  FetchPhrasesAction,
  updatePhraseAction
} from 'modules/phrases/phrasesStore';
import { Phrase } from 'modules/phrases/phrasesTypes';
import { ThunkDispatch } from 'redux-thunk';
import { GlobalState } from 'types';
import PhrasesTableEditRowActionsButtons from './PhrasesTableEditRowActionsButtons';
import PhrasesTableRow from './PhrasesTableRow';

type OwnProps = {
  phrase: Phrase;
};

type Props = OwnProps & {
  handleDeleteDecisionPopperConfirmClick: VoidFunction;
  updatePhrase: (phrase: Phrase) => void;
};

type State = {
  deleteButtonRef: HTMLButtonElement | null;
  isDeleteDecisionPopperVisible: boolean;
  phrase: Phrase | undefined;
};

class PhrasesTableEditRow extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      deleteButtonRef: null,
      isDeleteDecisionPopperVisible: false,
      phrase: undefined
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleDeleteDecisionPopperDenyClick = this.handleDeleteDecisionPopperDenyClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleTogglingButtonClick = this.handleTogglingButtonClick.bind(this);
    this.undefinePhrase = this.undefinePhrase.bind(this);
    this.renderActionsButtons = this.renderActionsButtons.bind(this);
  }

  handleKeyDown({ keyCode }: React.KeyboardEvent<HTMLDivElement>) {
    if (keyCode === 13) {
      this.handleSaveButtonClick();
    }

    if (keyCode === 27) {
      this.undefinePhrase();
    }
  }

  handleDeleteButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    this.setState({
      deleteButtonRef: e.currentTarget,
      isDeleteDecisionPopperVisible: true
    });
  }

  handleDeleteDecisionPopperDenyClick() {
    this.setState({ isDeleteDecisionPopperVisible: false });
  }

  handleChange(phrase: Phrase) {
    this.setState({ phrase });
  }

  handleSaveButtonClick() {
    const { phrase, updatePhrase } = this.props;

    updatePhrase({
      ...phrase,
      ...this.state.phrase
    });

    this.handleTogglingButtonClick();
  }

  handleTogglingButtonClick() {
    this.setState(state => ({
      phrase: state.phrase ? undefined : { ...this.props.phrase }
    }));
  }

  undefinePhrase() {
    this.setState({ phrase: undefined });
  }

  renderActionsButtons() {
    return (
      <PhrasesTableEditRowActionsButtons
        isEditing={Boolean(this.state.phrase)}
        onCancelClick={this.handleTogglingButtonClick}
        onDeleteClick={this.handleDeleteButtonClick}
        onEditClick={this.handleTogglingButtonClick}
        onSaveClick={this.handleSaveButtonClick}
      />
    );
  }

  render() {
    const { handleDeleteDecisionPopperConfirmClick, phrase } = this.props;

    return (
      <React.Fragment>
        <div onKeyDown={this.handleKeyDown}>
          <PhrasesTableRow
            isEditing={Boolean(this.state.phrase)}
            phrase={this.state.phrase || phrase}
            renderActionsButtons={this.renderActionsButtons}
            onChange={this.handleChange}
          />
        </div>

        <DecisionPopper
          isOpen={this.state.isDeleteDecisionPopperVisible}
          message="Are you sure you want to delete this item?"
          anchorEl={this.state.deleteButtonRef}
          onConfirm={handleDeleteDecisionPopperConfirmClick}
          onDeny={this.handleDeleteDecisionPopperDenyClick}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  (dispatch: ThunkDispatch<GlobalState, void, FetchPhrasesAction>, ownProps: OwnProps) => ({
    handleDeleteDecisionPopperConfirmClick: () => {
      dispatch(deletePhraseAction(ownProps.phrase));
    },
    updatePhrase: (phrase: Phrase) => {
      dispatch(updatePhraseAction(phrase));
    }
  })
)(PhrasesTableEditRow);
