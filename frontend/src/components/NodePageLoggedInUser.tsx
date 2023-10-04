import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Pagination, Row, Spinner } from 'react-bootstrap'
import { NodeType } from '../models/node'
import AddNewNoteDialog from './AddNewNoteDialog'
import Nodes from './Nodes'
import SingUpModal from './SingUpModal'

import { deleteNode, fetchNodes } from "../network/nodesApi"
import LoginModal from './LoginModal'
import styles from "../styles/node.module.css"




interface PaginatorProps{
    setstartpage :React.Dispatch<React.SetStateAction<number>>,
    totalpages:number
  }
 
  const PaginationBasic =({setstartpage,totalpages}:PaginatorProps)=> {
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
  
    for (let number = 1; number <= Math.ceil((totalpages/3)); number++) {
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




const NodePageLoggedInUser = () => {
    const [nodes, setnodes] = useState<NodeType[]>([])

const [showNoteDialog, setshowNoteDialog] = useState(false)
const [lodingTHeNOdeState, setlodingTHeNOdeState] = useState(true)
const [errorDuuringFechingOfNODE, seterrorDuuringFechingOfNODE] = useState(false)
const [totalpages, settotalpages] = useState(0)

const [startpage, setstartpage] = useState(1)
const [noteToEDit, setnoteToEDit] = useState<NodeType | null>(null)

const onDeleteClicked =async(node:NodeType)=>{
    try {
      await deleteNode(node._id)
      setnodes(nodes.filter(existingnode=>existingnode._id !== node._id))
    } catch (error) {
      console.log(error)
      alert(error)
    }
}
const onNodeClicked =(node:NodeType)=>{
    console.log(node._id)
    setnoteToEDit(node)
  }
  






  









  

useEffect(() => {

  async function getNodes() {
  try {
  // const response =await fetch(`http://127.0.0.1:5000/api/routes` , {method:"GET"})
  // const data = await response.json()
const data = await  fetchNodes(startpage)
// console.log(data)
setlodingTHeNOdeState(true)
setnodes(data.nodes)
settotalpages(data.nodeLength)

// setnodes(data.slice((startpage-1)*5, startpage*5))
// console.log(startpage)
console.log(nodes)
console.log({totalpages})
setlodingTHeNOdeState(false)
  } catch (error) {
    console.log(error)
    seterrorDuuringFechingOfNODE(true)
    alert(error)
  }finally{
    setlodingTHeNOdeState(false)
    // seterrorDuuringFechingOfNODE(true)

  }

  }
  getNodes()

  return () => {
    
  }
}, [startpage])

const nodeRow =(
    <Row  xs={1} md={2}  xl={3}>
    {/* {JSON.stringify(nodes)} */}
    {
     nodes &&  nodes.map((node, index)=>(
      <Col key={index}>
        <Nodes classNamer={styles.node}  node={node}  onNodeClicked={onNodeClicked}
        
        
        onDeleteClicked={onDeleteClicked}
        />
        </Col>
      ))
    }
  </Row>
  )
  
  return (
    <>
    
    <Container>
  <Button className='mt-60'  
   onClick={()=>setshowNoteDialog(true)}
  > 
    Add new Note</Button>
    {
      lodingTHeNOdeState &&  <Spinner  /> 

      
    }
    {errorDuuringFechingOfNODE && <p>Threr aer some error</p>}
    {!lodingTHeNOdeState && !errorDuuringFechingOfNODE && 
    <>
    {
      nodes.length > 0 ?   nodeRow :<p> threer are no nodes toshow</p>
    }
    
    </>
    
    }

{
  showNoteDialog  && <AddNewNoteDialog 
   onDismiss={()=>setshowNoteDialog(false)}
   onNoteSaved={(newNote)=>{
    setnodes([...nodes,newNote])
    setshowNoteDialog(false)
   }}
  />

}
{
  noteToEDit && 
  <AddNewNoteDialog 
  nodeToEdit={noteToEDit}
  onDismiss={()=>setnoteToEDit(null)}
  onNoteSaved={async(updatedNote)=>{
  await setnodes(nodes.map(existingNote =>existingNote._id === updatedNote._id ? updatedNote:existingNote))
   setnoteToEDit(null)
   setshowNoteDialog(false)
  }}
 />
}
{
  false && <SingUpModal
  
   onDismiss={()=>{}}
   onSignUpSuccessfull={()=>{}}
  />
}
{
  false && <LoginModal
  
   onDismiss={()=>{}}
   onLoginSuccessfull={()=>{}}
  />
}

<Container>
<PaginationBasic setstartpage={setstartpage}  totalpages={totalpages} />
</Container>


</Container>
    </>
  )
}

export default NodePageLoggedInUser