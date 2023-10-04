import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { NodeType, User } from './models/node';
import Nodes from './components/Nodes';
import styles from './styles/NodesPage.module.css'
import { deleteNode, fetchNodes, getLoggedInUser } from './network/nodesApi';
import AddNewNoteDialog from './components/AddNewNoteDialog';
import Pagination from 'react-bootstrap/Pagination';
import SingUpModal from './components/SingUpModal';
import LoginModal from './components/LoginModal';
import NavbarFor from './components/NavbarFor';
import NodePageLoggedInUser from './components/NodePageLoggedInUser';
import NodePageLoggedOut from './components/NodePageLoggedOut';
import NotePages from './pages/NotePages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';


interface PaginatorProps{
  setstartpage :React.Dispatch<React.SetStateAction<number>>
}

const PaginationBasic =({setstartpage}:PaginatorProps)=> {
  const [state, setState] = useState({
    data: [],
    limit: 10,
    activePage: 1
  });

  let active = 2;
  let items = [];
  const handlePageChange = (pageNumber:number) => {
    setState((prev) => ({ ...prev, activePage: pageNumber}));
    // setstartpage((prev:number)=>prev+1)
    setstartpage(pageNumber)
  }

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === state.activePage}    onClick={() => handlePageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  
return(

  <div>
    <Pagination >{items}</Pagination>
    {/* <br /> */}

    {/* <Pagination size="lg">{items}</Pagination> */}
    {/* <br /> */}

    {/* <Pagination size="sm">{items}</Pagination> */}
  </div>
);
}


function App() {
// const [nodes, setnodes] = useState<NodeType[]>([])

// const [showNoteDialog, setshowNoteDialog] = useState(false)
// const [lodingTHeNOdeState, setlodingTHeNOdeState] = useState(true)
// const [errorDuuringFechingOfNODE, seterrorDuuringFechingOfNODE] = useState(false)

// const [startpage, setstartpage] = useState(1)
const [noteToEDit, setnoteToEDit] = useState<NodeType | null>(null)
const [loggedInUser, setloggedInUser] = useState<User | null >(null)
const [showSignUpModal, setshowSignUpModal] = useState(false)
const [showLoginModal, setshowLoginModal] = useState(false)

useEffect(() => {
  async function fetchLoggedInUser(){
    try {
       const user= await getLoggedInUser()
       console.log(user)
       setloggedInUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  fetchLoggedInUser()

  return () => {
    
  }
}, [])




// const onNodeClicked =(node:NodeType)=>{
//   console.log(node._id)
//   setnoteToEDit(node)
// }

// const onDeleteClicked =async(node:NodeType)=>{
//     try {
//       await deleteNode(node._id)
//       setnodes(nodes.filter(existingnode=>existingnode._id !== node._id))
//     } catch (error) {
//       console.log(error)
//       alert(error)
//     }
// }


// useEffect(() => {

//   async function getNodes() {
//   try {
//   // const response =await fetch(`http://127.0.0.1:5000/api/routes` , {method:"GET"})
//   // const data = await response.json()
// const data = await  fetchNodes()
// // console.log(data)
// setlodingTHeNOdeState(true)
// setnodes(data)
// setnodes(data.slice((startpage-1)*5, startpage*5))
// // console.log(startpage)
// // console.log(nodes)
// setlodingTHeNOdeState(false)
//   } catch (error) {
//     console.log(error)
//     seterrorDuuringFechingOfNODE(true)
//     alert(error)
//   }finally{
//     setlodingTHeNOdeState(false)
//     // seterrorDuuringFechingOfNODE(true)

//   }

//   }
//   getNodes()

//   return () => {
    
//   }
// }, [startpage])


// const nodeRow =(
//   <Row  xs={1} md={2}  xl={3}>
//   {/* {JSON.stringify(nodes)} */}
//   {
//    nodes &&  nodes.map((node, index)=>(
//     <Col key={index}>
//       <Nodes classNamer={styles.node}  node={node}  onNodeClicked={onNodeClicked}
      
      
//       onDeleteClicked={onDeleteClicked}
//       />
//       </Col>
//     ))
//   }
// </Row>
// )

// console.log("style.nodes=====:", styles.node)
  return (
    <BrowserRouter>
   <div>
    <NavbarFor
        loggedInUser ={loggedInUser}
        onSignUpClicked = {()=>{setshowSignUpModal(true)}}
        onLoginClicked= {()=>{setshowLoginModal(true)}}
        onLogoutSuccessfull={()=>setloggedInUser(null)}
    />
    <Container>
    <Routes>

  
      <Route path='/' element=   {<NotePages loggedInUser={loggedInUser}/>}/>


         <Route path="/privacy" element={<PrivacyPage/>}  />

         <Route path='/*' element={<NotFoundPage/>} />

    </Routes>
    </Container>



      {
              showSignUpModal && 
              <SingUpModal
               onDismiss={()=>{setshowSignUpModal(false)}}
               onSignUpSuccessfull={(user)=>{
       setloggedInUser(user)
    setshowSignUpModal(false)
               }}
              />
          
            }
            {
              showLoginModal && 
              <LoginModal 
              onDismiss={()=>{setshowLoginModal(false)}}
              onLoginSuccessfull={(user)=>{

       setloggedInUser(user)
  setshowLoginModal(false)
              }}
              />

            }
    
</div>
</BrowserRouter>
  );
}

export default App;
