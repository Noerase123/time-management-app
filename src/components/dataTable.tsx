import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Row from './Row'

interface IProp {
  data: any[]
}

const DataTable:React.FC<IProp> = props => {

  return (
      <>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell>Projects</TableCell>
                <TableCell align="right">Tasks</TableCell>
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Date Updated</TableCell>
                <TableCell />
            </TableRow>
            </TableHead>
            <TableBody>
            {props.data.length > 0 ? 
              props.data.map((row, key) => (
                <Row key={key} row={row} />
              ))
            : (
              <p className="m-2 text-center">No Content</p>
            )}
            </TableBody>
        </Table>
        </TableContainer>
        <div className="d-flex justify-content-end p-3">
            <Pagination count={2} variant="outlined" />
        </div>
      </>
  );
}

export default DataTable