import React, {useState} from 'react'
import {Row, Col, ListGroup} from 'react-bootstrap'
import {IconButton, Snackbar} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Panel from './components/panel'

const App:React.FC = props => {
  
  const [openSnack, setOpenSnack] = useState(false)
  
  const closeSnack = () => setOpenSnack(false)

  const [page, setPage] = useState<any>("projects")

  const navs:any = {
    "Dashboard" : "dashboard",
    "Projects" : "projects",
    "Finances" : "finances",
    "Daily Routines" : "routines"
  }

  const objNavs: any[] = Object.getOwnPropertyNames(navs)

  return (
    <div className="p-4" style={{backgroundColor:'#343a40'}}>
      <div className="container">
        <h3 className="text-light">Time Management Application</h3>
        <br/>
        <Row>
          <Col sm={3}>
          <ListGroup style={{top:20, position:'sticky'}}>
            {objNavs.map((nav, key) => {
              return (
                <ListGroup.Item 
                key={key} 
                action 
                onClick={() => setPage(navs[nav])}
                variant="info" 
                >
                  {nav}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          </Col>
          <Col sm={9}>
            <Panel page={page}/>
            
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              open={openSnack}
              autoHideDuration={1500}
              onClose={closeSnack}
              message="Project Added!"
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnack}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />

          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App
