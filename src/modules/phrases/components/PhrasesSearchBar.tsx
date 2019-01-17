import { createStyles, InputBase, Paper, Theme, withStyles, WithStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      padding: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit - 2,
      paddingTop: theme.spacing.unit + 2
    },
    textField: {
      flexGrow: 1,
      marginLeft: theme.spacing.unit * 2
    }
  });

type Props = WithStyles<typeof styles> & {
  onChange: (searchValue: string) => void;
};

type State = {
  searchValue: string;
};

class PhrasesSearchBar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchValue: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.fireOnChange = _.debounce(this.fireOnChange.bind(this), 400);
  }

  fireOnChange() {
    this.props.onChange(this.state.searchValue);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });

    this.fireOnChange();
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.container}>
        <SearchIcon />

        <InputBase
          className={classes.textField}
          placeholder="Search phrases by name..."
          onChange={this.handleInputChange}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(PhrasesSearchBar);
