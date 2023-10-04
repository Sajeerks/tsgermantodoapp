import React, { useState } from 'react'
import { User } from '../models/node'
import { useForm } from 'react-hook-form'
import { SignUpBody } from '../network/nodesApi'
import * as NotesApi from "../network/nodesApi"
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField'
import styledUtils from "../styles/node.module.css"
import { ConflictError } from '../errorsForntend/http_errors'

interface SignUpProps{
    onDismiss:()=>void,
    onSignUpSuccessfull:(user:User) =>void
}
const SingUpModal = ({onDismiss, onSignUpSuccessfull}:SignUpProps) => {
    const {register,handleSubmit, formState:{errors,isSubmitting} } = useForm<SignUpBody>()
    const [errorText, seterrorText] = useState<null| string>(null)
    async function onSubmit(credentials:SignUpBody){
        try {
            
            const newUser= await NotesApi.signupFunctionFrontend(credentials)
            onSignUpSuccessfull(newUser)
        } catch (error) {
          if(error instanceof ConflictError){
            seterrorText(error.message)

          }else{
            alert(error)

          }
            console.error(error)
        }
    }
  return (
  <Modal  show onHide={onDismiss}>
       <Modal.Header closeButton>
        <Modal.Title>
        Sign up
        </Modal.Title>
        
       </Modal.Header>
       <Modal.Body>
        {errorText && <Alert variant='danger'>
          {errorText}
          </Alert>}
          <Form  onSubmit={handleSubmit(onSubmit)}>
                  <TextInputField 
                      name="username"
                      label="username"
                      type="text"
                      placeholder="Username"
                      register={register}
                      registerOptions={{required:"Required"}}
                      error={errors.username}
                  />
                    <TextInputField 
                      name="email"
                      label="email"
                      type="email"
                      placeholder="email"
                      register={register}
                      registerOptions={{required:"Required"}}
                      error={errors.email}
                  />
                    <TextInputField 
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      register={register}
                      registerOptions={{required:"Required"}}
                      error={errors.password}
                  />
                  <Button 
                   type="submit"
                   disabled={isSubmitting}
                className={styledUtils.width100}
                  >
                Sign up user
                  </Button>
          </Form>
       </Modal.Body>
  </Modal>
  )
}

export default SingUpModal