import React, { useState } from 'react';
import {Card, Modal, Button} from 'react-bootstrap'
import {TextField} from '@material-ui/core'
import DataTable from './dataTable'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {useDispatch, connect} from 'react-redux'
import {addProject} from '../redux/actions/actionList'
import {IconButton, Snackbar} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

interface IProp {
    page: string
    project: any
}

const Panel:React.FC<IProp> = props => {
    const {page, project} = props

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
            projName : projName,
            dateCreated: 'Jan 21, 2021',
            dateUpdated: 'Mar 22, 2021',
            tasks: []
        }
        setMsg(project.notif.msg)
        setOpenSnack(true)
        dispatch(addProject(payload))
    }

    // const displayProjects = () => {
    //     console.log(project)
    // }

    // React.useEffect(() => {
    //     displayProjects()
    // }, [])

    // const rows = [
    //     {
    //       projName : 'Blockchain (Solidity) Training',
    //       dateCreated: '31-May-21',
    //       dateUpdated: '28-Jan-22',
    //       tasks: [
    //         {
    //           taskName: 'Some Random Task',
    //           description: 'This Random Task is react JS',
    //           progress: 'On-progress',
    //           dateStarted: '31-May-21',
    //           dateEnded: null
    //         },

    return (
        <React.Fragment>
            {page === 'projects' && (
                <div>
                    <Card className="p-4">
                        <div className="d-flex justify-content-between">
                            <h3>Projects</h3>
                            <span onClick={handleShow}>
                            <AddCircleOutlineIcon style={{fontSize:40, color:'#343a40', cursor:'pointer'}}/>
                            </span>
                        </div>
                        <DataTable data={project.data}/>
                    </Card>
                    
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form noValidate autoComplete="off" onSubmit={AddProjBtn}>
                        <TextField onChange={(e) => setProjName(e.target.value)} id="standard-basic" label="Project Name" fullWidth/>
                    </form>
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
                    <h1>Finances Page</h1>
                </div>
            )}
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
      project: state.project
    }
  }

export default connect(mapStateToProps)(Panel)