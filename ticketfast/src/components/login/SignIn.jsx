import React from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import LoginCSS from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

export default function SignIn() {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const createAlert = () => {
        return (<Alert variant='danger' show={show} onClose={() => setShow(false)} dismissible>{error}</Alert>)
    }

    const onLoginButtonClick = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const response = await fetch('http://localhost:3001/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: username, password: password })
            })
            if (response.ok) {
                const data = await response.json();
                setUser(data)
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                setError("usuario o contraseña incorrectos")
                setShow(true)
            }
        } catch (err) {
            setError(err.message)
            setShow(true)
        }
    }

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
          navigate('/dashboard');
        }
      }, []);
      

    return (

        <div className="main p-5 d-flex align-content-center justify-content-center" >
            <div className={LoginCSS.container}>
                <div className={LoginCSS.subcontainer} >
                    {error !== null ? createAlert() : null}
                    <h1 className={LoginCSS.h1}>Bienvenido</h1>
                    <Form onSubmit={onLoginButtonClick}>
                        <Form.Group>
                            <Form.Control className={LoginCSS.formgroup} type="text" placeholder='Usuario (correo electrónico)' onChange={handleUsernameChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={LoginCSS.formgroup} type="password" placeholder='Contraseña' onChange={handlePasswordChange} />
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
