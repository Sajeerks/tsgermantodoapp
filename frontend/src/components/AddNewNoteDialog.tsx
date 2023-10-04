import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { NodeType } from '../models/node';
import { useForm } from 'react-hook-form';
import { RoleInput, createNote, updateNode } from '../network/nodesApi';
import TextInputField from './form/TextInputField';

interface AddNoteDialogProps{
  nodeToEdit?:NodeType,
    onDismiss:()=>void,
    onNoteSaved:(note:NodeType) =>void,
   

}


const AddNewNoteDialog = ( {onDismiss,onNoteSaved,nodeToEdit}:AddNoteDialogProps) => {
  const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm<RoleInput>({
    defaultValues:{
      title:nodeToEdit?.title || "",
      text:nodeToEdit?.text || ""
    }
  })

async function onSubmit(input:RoleInput){
  try {
    let noteResponse:NodeType
    if(nodeToEdit) {
      noteResponse = await updateNode(nodeToEdit._id, input)

    }else{
      noteResponse = await createNote(input)
    }

    onNoteSaved(noteResponse)
    
   
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton >
            <Modal.Title>
            {nodeToEdit?"Edit note":"Add Note"}
            </Modal.Title>
          
        </Modal.Header>
           <Modal.Body>
           <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
            <TextInputField
               name ="title"
              label='title'
              type="text"
              placeholder ='Title'
              register={register}
              registerOptions={{required:"Required"}}
              error={errors.title}
            />
      {/* <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter  title"   
        isValid={!!errors.title}
      
        {...register("title", {required:"Required"})}
        />
 
        <Form.Control.Feedback  type="invalid"  >
             {errors.title?.message}
        </Form.Control.Feedback>
      </Form.Group> */}
      <TextInputField
        name="text"
        label="Text"
        as="textarea"
        rows={5}
        placholder ="Text"
        register={register}

      />

      {/* <Form.Group className="mb-3" >
        <Form.Label>Text</Form.Label>
        <Form.Control as="textarea" placeholder="Text area" rows={5}  
        {...register("text")}
        />
      </Form.Group> */}
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
   
    </Form>
           </Modal.Body>
  <Modal.Footer>
  <Button variant="primary" type="submit" form="addNoteForm" disabled={isSubmitting}>
        Submit
      </Button>
  </Modal.Footer>

    </Modal>
  )
}

export default AddNewNoteDialog