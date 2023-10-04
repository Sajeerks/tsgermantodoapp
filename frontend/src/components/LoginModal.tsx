import React, { useState } from 'react'
import { User } from '../models/node'
import { useForm } from 'react-hook-form'
import { LoginBody } from '../network/nodesApi'
import * as NodeAPi from "../network/nodesApi"
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField'
import styledUtils from "../styles/node.module.css"
import { UnauthorizedError } from '../errorsForntend/http_errors'

interface LoginModalProps {
    onDismiss:()=>void,
    onLoginSuccessfull:(user:User)=>void

}
const LoginModal = ({onDismiss,onLoginSuccessfull }:LoginModalProps) => {
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<LoginBody>()
    const [errorText, seterrorText] = useState<string |null>(null)

    async function onSubmit(credentials:LoginBody){
            try {
                const user = await NodeAPi.loginUserInFrontend(credentials)
                onLoginSuccessfull(user)

                
            } catch (error) {

                if(error instanceof UnauthorizedError){
                    seterrorText(error.message)
                }else{
                    alert(error)

                }
                console.log(error)
                console.log({errorText})
            }

    }
  return (
  <Modal show onHide={onDismiss}>
    <Modal.Header>
          <Modal.Title>
             Log In
          </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {errorText && <Alert variant='danger'>
              {errorText}
            </Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInputField 
             name="username"
             label='username'
             type="text"
             placeholder="username"
             register={register}
             registerOptions={{required:"Required"}}
             error={errors.username}
            />
            <TextInputField 
             name="password"
             label='password'
             type="password"
             placeholder="password"
             register={register}
             registerOptions={{required:"Required"}}
             error={errors.password}
            />
           <Button
            type='submit'
            disabled={isSubmitting}
            className={styledUtils.width100}
           >
            Login
           </Button>

        </Form>
    </Modal.Body>

  </Modal>
  )
}

export default LoginModal