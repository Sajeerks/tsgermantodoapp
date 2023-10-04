import React from 'react'
import * as NotesApi from "../network/nodesApi"
import { User } from '../models/node'
import { Button, Navbar } from 'react-bootstrap'


interface NavBarLoggedInProps{
    user:User,
    onLogoutSuccessfull:()=>void

}
const NavLoggedInView = ({user,onLogoutSuccessfull }:NavBarLoggedInProps) => {

    async function logoutInfrontEndNav(){
        try {
        await NotesApi.logoutUserInFrontend()
        onLogoutSuccessfull()
            
        } catch (error) {
             alert(error)
             console.error(error)
        }
    }
  return (
    <>
      <Navbar.Text className='"me-2'>
      Signed In as {user?.username}         
      </Navbar.Text>
      <Button onClick={logoutInfrontEndNav}>Logout</Button>
    </>
  )
}

export default NavLoggedInView