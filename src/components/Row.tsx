import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import {Button, TextField} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Modal} from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { addTask, deleteProject } from '../redux/actions/actionList';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

interface IData {
  projectID: string
  projName: string
  dateCreated: string
  dateUpdated: string
  tasks: any[]
}

interface IProp {
  row: IData
  project: any
  taskDispatchOne: (projects: any[], projectID: string, data: any) => void
  projectDelete: (params: any) => void
}

const Row = (props: IProp) => {
  const { row, project, taskDispatchOne, projectDelete } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  //add task modal
  const [showModal, setShowModal] = React.useState(false)
  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  //alert modal
  const [alertMsg, setAlertMsg] = React.useState('Delete this project?')
  const [alertBtn, setAlertBtn] = React.useState(false)
  const [showAlert, setShowAlert] = React.useState(false)
  const handleAlertopen = () => setShowAlert(true)
  const handleAlertclose = () => setShowAlert(false)

  //edit modal
  const [showEdit, setShowEdit] = React.useState(false)
  const handleEditOpen = () => setShowEdit(true)
  const handleEditClose = () => setShowEdit(false)
  
  //data fields
  const [taskName, setTaskName] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [startDate, setStartDate] = React.useState('')
  const [progress] = React.useState('On-progress')
  const handleAddTask = () => {
    const payload = {
      taskName: taskName,
      description: desc,
      progress: progress,
      dateStarted: startDate,
      dateEnded: null
    }
    taskDispatchOne(project.data, row.projectID, payload)
    handleCloseModal()
  }
  const handleDeleteTask = () => {
    const dataArr: any[] = project.data
    let index = dataArr.map((item) => item.projectID).indexOf(row.projectID)
    if (index > -1) {
      dataArr.splice(index, 1)
      projectDelete(dataArr)
    }
    setAlertMsg('Project Delete!')
    setAlertBtn(true)
    setTimeout(() => {  
      handleAlertclose()
      setAlertBtn(false)
      setAlertMsg('Delete this project?')
    }, 1000);
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
            <Button style={{zIndex:0}} onClick={handleAlertopen}>
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
                                {`${row.projectID} \n ${task.description}`}
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
                          <EditIcon className="text-info" onClick={handleEditOpen}/>
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
          {/* <form noValidate autoComplete="off"> */}
            <TextField
              id="standard-basic"
              label="Task Name"
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
            />
            <br /><br />
            <TextField
              id="standard-basic"
              label="Task Description"
              onChange={e => setDesc(e.target.value)}
              fullWidth
            />
            <br /><br />
            <label>Started Date</label>
            <TextField
              type="date"
              id="standard-basic"
              onChange={e => setStartDate(e.target.value)}
              fullWidth
            />
          {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" color="primary" onClick={handleCloseModal} style={{marginRight: 10}}>
              Close
            </Button>
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add task
            </Button>
          </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>Task Details ({progress})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {/* <form noValidate autoComplete="off"> */}
            <TextField
              id="standard-basic"
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              fullWidth
            />
            <br /><br />
            <TextField
              id="standard-basic"
              label="Task Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              fullWidth
            />
            <br /><br />
            <label>Started Date</label>
            <TextField
              type="date"
              id="standard-basic"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              fullWidth
            />
          {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-center">
              <Button variant="outlined" color="primary" onClick={handleEditClose} style={{marginRight: 10}}>
                Close
              </Button>
              <Button variant="contained" color="primary" onClick={() => console.log('Done With the Tasks')}>
                Done
              </Button>
            </div>
          </Modal.Footer>
      </Modal>
      
      <Modal show={showAlert} onHide={handleAlertclose}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>{alertMsg}</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" color="primary" onClick={handleAlertclose} disabled={alertBtn} style={{marginRight: 10}}>
              cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleDeleteTask} disabled={alertBtn}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>

    </React.Fragment>
  );
}

const MapStateToProps = (state: any) => {
  return {
    project: state.project
  }
}

const MapDispatchToProps = (dispatch: any) => {
  return {
    taskDispatchOne: (projects: any[], projectID: string, data: any) => {
      dispatch(addTask(projects, projectID, data))
    },
    projectDelete: (params: any) => dispatch(deleteProject(params))
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(Row)