import { TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import * as React from 'react';

export default function PhrasesTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography variant="h5">Name</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="h5">Categories</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="h5">Values</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
