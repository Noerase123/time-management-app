import React, { useState } from 'react';
import { Card, Modal, Button, ListGroup, Row, Col } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import DataTable from './dataTable'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, connect } from 'react-redux'
import { addProject } from '../redux/actions/actionList'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { v4 as uuidv4 } from 'uuid'

interface IProp {
    page: string
    project: any
    finance: any
    routine: any
    goal: any
}

const Panel: React.FC<IProp> = props => {
    const { page, project, finance, routine, goal } = props

    const dispatch = useDispatch()

    const [projName, setProjName] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [msg, setMsg] = useState('')
    const closeSnack = () => setOpenSnack(false)

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)

    const AddProjBtn = () => {
        setShow(false)
        const payload = {
            projectID: uuidv4(),
            projName: projName,
            dateCreated: 'Jan 21, 2021',
            dateUpdated: 'Mar 22, 2021',
            tasks: []
        }
        setMsg(project.notif.msg)
        setOpenSnack(true)
        dispatch(addProject(payload))
    }

    return (
        <React.Fragment>
            {page === 'projects' && (
                <div>
                    <Card className="p-4">
                        <div className="d-flex justify-content-between">
                            <h3>Projects</h3>
                            <span onClick={handleShow}>
                                <AddCircleOutlineIcon style={{ fontSize: 40, color: '#343a40', cursor: 'pointer' }} />
                            </span>
                        </div>
                        <DataTable data={project.data} />
                    </Card>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add project</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TextField onChange={(e) => setProjName(e.target.value)} id="standard-basic" label="Project Name" fullWidth />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="info" onClick={AddProjBtn}>
                                Add Project
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={openSnack}
                        autoHideDuration={1500}
                        onClose={closeSnack}
                        message={msg === '' ? 'Project Added' : msg}
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnack}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </div>
            )}
            {page === 'finances' && (
                <div>
                    <Card className="p-4">
                        <div className="d-flex justify-content-between pb-3">
                            <h3>Daily Finances</h3>
                            <span onClick={handleShow}>
                                <AddCircleOutlineIcon style={{ fontSize: 40, color: '#343a40', cursor: 'pointer' }} />
                            </span>
                        </div>
                        <Row>
                            <Col sm={6}>
                                <h5 className="text-center">Expenses</h5>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <p>Breakfast</p>
                                            <b className="text-danger">
                                                - P500.00
                                            </b>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <p>Lunch</p>
                                            <b className="text-danger">
                                                - P275.00
                                            </b>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="d-flex justify-content-between">
                                            <p>Dinner</p>
                                            <b className="text-danger">
                                                - P400.00
                                            </b>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <input type="text" className="form-control" placeholder="add expense" />
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
            {page === 'timetable' && (
                <div>
                    <Card className="p-4">
                        <div className="d-flex justify-content-between pb-3">
                            <h3>Time Table</h3>
                            <span onClick={() => console.log('add routines')}>
                                <AddCircleOutlineIcon style={{ fontSize: 40, color: '#343a40', cursor: 'pointer' }} />
                            </span>
                        </div>
                    </Card>
                </div>
            )}
            {page === 'dashboard' && (
                <div className="d-flex justify-content-around">
                    <div>
                        <h5 className="text-light">Projects</h5>
                        <b className="text-light">{project.data.length}</b>
                    </div>
                    <div>
                        <h5 className="text-light">Finances</h5>
                        <b className="text-light">{finance.expenses.length}</b>
                    </div>
                    <div>
                        <h5 className="text-light">Routines</h5>
                        <b className="text-light">{routine.data.length}</b>
                    </div>
                    <div>
                        <h5 className="text-light">Goals</h5>
                        <b className="text-light">{goal.data.length}</b>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        project: state.project,
        finance: state.finance,
        routine: state.routine,
        goal: state.goal
    }
}

export default connect(mapStateToProps)(Panel)