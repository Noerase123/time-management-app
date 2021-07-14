import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Button, TextField} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Modal} from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../redux/actions/actionList';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface IData {
  projName: string
  dateCreated: string
  dateUpdated: string
  tasks: any[]
}

function Row(props: { row: IData }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [showModal, setShowModal] = React.useState(false)
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const dispatch = useDispatch()

  const deleteData = (projName: string) => {
    console.log(projName)
    dispatch({
      type: 'DELETEPROJ',
      notif: {
        snack: true,
        msg: 'Project Deleted!'
      },
      payload: projName
    })
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row">
          <h5><b>{row.projName}</b></h5>
        </TableCell>
        <TableCell align="right">{row.tasks.length}</TableCell>
        <TableCell align="right">{row.dateCreated}</TableCell>
        <TableCell align="right">{row.dateUpdated}</TableCell>
        <TableCell align="right">
            <Button style={{zIndex:0}} onClick={() => deleteData(row.projName)}>
                <HighlightOffIcon color="secondary"/>
            </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div className="d-flex justify-content-between">
                <Typography variant="h6" gutterBottom component="div">
                  Tasks
                </Typography>
                <span onClick={handleOpenModal}>
                  <AddCircleOutlineIcon/>
                </span>
              </div>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Tasks</TableCell>
                    <TableCell align="right">Progress</TableCell>
                    <TableCell align="right">Date Started</TableCell>
                    <TableCell align="right">Date Ended</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tasks.map((task, key) => {
                    let prog
                    switch (task.progress) {
                      case 'Done':
                        prog = 'success'
                        break;
                      case 'On-progress':
                        prog = 'warning'
                        break;
                    }
                    return (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {key + 1}
                        </TableCell>
                        <TableCell>
                          <Tooltip title={
                            <React.Fragment>
                              <div className="text-light text-center p-2" style={{fontSize: 15}}>
                                This is for description
                              </div>
                            </React.Fragment>
                          } arrow>
                            <div>{task.taskName}</div>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right"><span className={`text-${prog}`}>{task.progress}</span> </TableCell>
                        <TableCell align="right">{task.dateStarted}</TableCell>
                        <TableCell align="right">{task.dateEnded === null ? '-' : task.dateEnded}</TableCell>
                        <TableCell align="right">
                            <EditIcon className="text-info"/>
                        </TableCell>
                      </TableRow>
                    )})}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Task Name" fullWidth/>
            <br/><br/>
            <label>Started Date</label>
            <TextField type="date" id="standard-basic" fullWidth/>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" color="primary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="contained" color="primary">
              Add task
            </Button>
          </Modal.Footer>
        </Modal>

    </React.Fragment>
  );
}

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
            {props.data.map((row, key) => (
                <Row key={key} row={row} />
            ))}
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