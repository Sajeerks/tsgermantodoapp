import React from 'react'
import { Button } from 'react-bootstrap'
interface NavBarLoggedOutViewProps{
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,
  
}
// type munna ={
//     jj:string,
//     sumer:(s:string)=>string
// }

const NavLogedOutView = ({onSignUpClicked,onLoginClicked}:NavBarLoggedOutViewProps) => {

  return (
    <>
     <Button onClick={onSignUpClicked}>Sign up</Button>
     <Button onClick={onLoginClicked}>Log in</Button>
    </>
  )
}

export default NavLogedOutView