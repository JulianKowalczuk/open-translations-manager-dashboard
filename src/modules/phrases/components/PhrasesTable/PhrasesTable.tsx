import { createStyles, Grid, Typography, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';

import { grey } from '@material-ui/core/colors';
import { PhrasesMap } from 'modules/phrases/phrasesStore';
import { PhrasesTableEditRow } from './components';

const styles = createStyles({
  header: {
    color: grey[700],
    marginTop: 5
  }
});

type Props = WithStyles<typeof styles> & {
  header: string;
  phrases: PhrasesMap;
};

function PhrasesTable({ classes, header, phrases }: Props) {
  return (
    <div>
      <Typography className={classes.header} variant="h5">
        {header}
      </Typography>

      <Grid container={true} direction="column" spacing={8}>
        {Object.values(phrases).map(phrase => (
          <Grid item={true} key={phrase.id}>
            <PhrasesTableEditRow phrase={phrase} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(PhrasesTable);
