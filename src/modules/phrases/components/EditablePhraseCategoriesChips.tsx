import {
  Chip,
  createStyles,
  MenuItem,
  Select,
  Theme,
  withStyles,
  WithStyles
} from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';

import { grey } from '@material-ui/core/colors';
import { SelectProps } from '@material-ui/core/Select';
import { PhrasesCategoriesMap } from 'modules/phrasesCategories';
import { GlobalState } from 'types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing.unit / 4
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    fullWidth: {
      width: '100%'
    },
    selectMenu: {
      marginLeft: 320,
      marginTop: -5
    },
    selectPlaceholder: {
      color: grey[500]
    }
  });

type Props = WithStyles<typeof styles> & {
  isEditing: boolean;
  onChange: (categoriesIds: number[]) => void;
  phrasesCategories: PhrasesCategoriesMap;
  value: number[];
};

class EditablePhraseCategoriesChips extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.handlePhraseCategoriesChange = this.handlePhraseCategoriesChange.bind(this);
    this.renderSelectValue = this.renderSelectValue.bind(this);
  }

  handlePhraseCategoriesChange(
    e: React.ChangeEvent<HTMLSelectElement> & { target: { value: any[] } }
  ) {
    this.props.onChange(e.target.value.filter(id => id !== 'none').map(id => Number(id)));
  }

  renderSelectValue(categoriesIds: SelectProps['value'] & any[] = []) {
    const { classes, phrasesCategories } = this.props;

    return (
      <div className={classes.chips}>
        {categoriesIds.length && categoriesIds[0] === 'none' ? (
          <span className={classes.selectPlaceholder}>Choose categories...</span>
        ) : (
          categoriesIds.map(id => (
            <Chip key={id} label={phrasesCategories[id]} className={classes.chip} />
          ))
        )}
      </div>
    );
  }

  render() {
    const { classes, isEditing, value = [], phrasesCategories } = this.props;

    return (
      <div className={classes.fullWidth}>
        {isEditing ? (
          <Select
            className={classes.fullWidth}
            disabled={!isEditing}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250
                }
              },
              PopoverClasses: { paper: classes.selectMenu }
            }}
            multiple={true}
            onChange={this.handlePhraseCategoriesChange}
            renderValue={this.renderSelectValue}
            value={value.length ? value.map(id => String(id)) : ['none']}
          >
            {Object.entries(phrasesCategories).map(([categoryId, categoryName]) => (
              <MenuItem key={categoryId} value={categoryId}>
                {categoryName}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <div>{this.renderSelectValue(value)}</div>
        )}
      </div>
    );
  }
}

export default connect((state: GlobalState) => ({
  phrasesCategories: state.phrasesCategories.all
}))(withStyles(styles)(EditablePhraseCategoriesChips));
