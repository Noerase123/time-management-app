import React, { useState } from 'react'
import {
  Row, Col, ListGroup,
  Navbar, Container, Nav
} from 'react-bootstrap'
import { IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Panel from './components/panel'
import { connect } from 'react-redux'

interface IProp {
  states: any
}

const App: React.FC<IProp> = props => {

  let { states } = props

  const [openSnack, setOpenSnack] = useState(false)

  const closeSnack = () => setOpenSnack(false)

  const [page, setPage] = useState<any>("dashboard")

  const objNavs: any[] = Object.getOwnPropertyNames(states)

  return (
    <div className="bg-dark">
      <Navbar bg="info" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Times Co.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => setPage('dashboard')}>DASHBOARD</Nav.Link>
              {objNavs.map((nav, key) => (
                <Nav.Link key={key} href="#" onClick={() => setPage(nav)}>{nav.toUpperCase()}</Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container pt-3">
        <h3 className="text-light">Time Management Application</h3>
        <br />
        <Row>
          <Col sm={3}>
            <ListGroup style={{ top: 20, position: 'sticky', paddingBottom: 600 }}>

              <ListGroup.Item
                action
                onClick={() => setPage('dashboard')}
                variant="info"
              >
                DASHBOARD
              </ListGroup.Item>
              {objNavs.map((nav, key) => {
                return (
                  <ListGroup.Item
                    key={key}
                    action
                    onClick={() => setPage(nav)}
                    variant="info"
                  >
                    {nav.toUpperCase()}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
          <Col sm={9}>
            <Panel page={page} />

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

const MapStateToProps = (state: any) => {
  return {
    states: state
  }
}

export default connect(MapStateToProps)(App)
