
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import isEmpty from 'lodash/isEmpty';
import Alert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables({data}) {
  return (
   <>
    {!isEmpty(data) ?
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.priceId}>
              <StyledTableCell component="th" scope="row">
                {(new Date(row.addedDate)).toLocaleString()}
              </StyledTableCell>
              <StyledTableCell align="left">{Number(row.price).toFixed(2)}</StyledTableCell>
          
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    :
       <Alert severity="info" >No data found! Please check the source and the price ticker.</Alert>
     }
    </>
  );
}