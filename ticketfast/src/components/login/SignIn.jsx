import React from 'react'
import { Button, Form } from 'react-bootstrap'
import LoginCSS from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function SignIn() {

    const [username , setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();
    
    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const onLoginButtonClick=()=>{
        navigate('/dashboard')
    }

    return (
        <div className="main p-5 d-flex align-content-center justify-content-center" >
            <div className={LoginCSS.container}>
                <div className={LoginCSS.subcontainer} >
                    <h1 className={LoginCSS.h1}>Bienvenido</h1>
                    <Form onSubmit={onLoginButtonClick}>
                        <Form.Group>
                            <Form.Control className={LoginCSS.formgroup} type="text" placeholder='Usuario' onChange={handleUsernameChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={LoginCSS.formgroup} type="password" placeholder='Contraseña' onChange={handlePasswordChange}/>
                        </Form.Group>

                        <div className="d-grid mb-3">
                            <Button className={LoginCSS.button} size='lg' type='submit'>Login</Button>
                        </div>

                        <div className='text-center'>
                            <span>¿No tienes cuenta? <Link to={'/register'}>Registrate</Link> </span>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}
