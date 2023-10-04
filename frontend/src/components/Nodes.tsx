import React from 'react'
import styles from "../styles/node.module.css"
import {NodeType} from '../models/node'
import {Card} from 'react-bootstrap'
import { formatDate } from '../utils/formatDate'
import { MdDelete,MdLibraryAdd } from "react-icons/md";


interface NodeProps{
    node:NodeType,
    classNamer?:string
    onNodeClicked:(note:NodeType)=>void
    onDeleteClicked:(note:NodeType)=>void
}

const Nodes = ({node,classNamer,onNodeClicked, onDeleteClicked}:NodeProps) => {
  // console.log(classNamer)
    const {
text, title, createdAt, updatedAt
    } = node

    let createUpdateedText:string 
    if(updatedAt > createdAt){
      createUpdateedText ="Updated " + formatDate(updatedAt)
    }else{
      createUpdateedText ="Created " + formatDate(createdAt)

    }
  return (
  <Card className={`${styles.noteCard} ${classNamer}` } onClick={()=>onNodeClicked(node)}>
    <Card.Body className={`${styles.cardBody}`}>
          <Card.Title>
               {title} <MdDelete onClick={(e)=>{
                onDeleteClicked(node)
                e.stopPropagation()
               }} className="m-4"/>

               <MdLibraryAdd
               
               
               />
          </Card.Title>
          <Card.Text className={styles.cardText}>
            {text}
          </Card.Text>
    </Card.Body>
    <Card.Footer className='text-muted'>
        {createUpdateedText}
    </Card.Footer>

  </Card>
  )
}

export default Nodes