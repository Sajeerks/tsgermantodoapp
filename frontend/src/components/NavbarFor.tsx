import React from 'react'
import { User } from '../models/node'
import { Container, Nav, Navbar} from 'react-bootstrap'
import NavLoggedInView from './NavLoggedInView'
import NavLogedOutView from './NavLogedOutView'
import { Link } from 'react-router-dom'

interface NavBarProps{
    loggedInUser:User|null
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,
    onLogoutSuccessfull:()=>void,

}
const NavbarFor = ({loggedInUser,onSignUpClicked ,onLoginClicked, onLogoutSuccessfull}:NavBarProps) => {
      
  return (
    <Navbar bg="primary" variant='dark' expand="lg" sticky='top'>
        <Container>
               <Navbar.Brand as={Link} to="/">
                 Cool notes only
               </Navbar.Brand>
               <Navbar.Toggle  aria-controls='main-navbar' />
               <Navbar.Collapse id="main-navbar">
                <Nav>
                  <Nav.Link as={Link} to="/privacy" >
                  
                    Privacy
             
                    </Nav.Link>
                </Nav>
                <Nav className="ms-auto" >
                   {loggedInUser?.username
                   ? <NavLoggedInView user={loggedInUser} onLogoutSuccessfull={onLogoutSuccessfull} />
                   :<NavLogedOutView  onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                   
                  }
                </Nav>
    
    </Navbar.Collapse>    
    
    
        </Container>

    </Navbar>
  )
}






export default NavbarFor