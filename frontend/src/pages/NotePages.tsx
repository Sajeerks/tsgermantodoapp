import React from 'react'
import NodePageLoggedInUser from '../components/NodePageLoggedInUser'
import NodePageLoggedOut from '../components/NodePageLoggedOut'
import { Container } from 'react-bootstrap'
import { User } from '../models/node'

type NotePageprops={
    loggedInUser:User|null
}

const NotePages = ({loggedInUser}:NotePageprops) => {
  return (    <Container>
    <>
     {loggedInUser?.username ? (<NodePageLoggedInUser/>):(<NodePageLoggedOut/>)}
    </>
 

</Container>
  )
}

export default NotePages