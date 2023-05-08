import React from 'react'
import { Alert, Button, Form, Container, Row, Col } from 'react-bootstrap'
import RegisterCSS from './Register.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import URL from '../../enviroment';

export default function Register() {

    const [name, setUsername] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    //form control handlers
    const handleNameChange = (e) => { setUsername(e.target.value) }
    const handleLastnameChange = (e) => { setLastname(e.target.value) }
    const handleEmailChange = (e) => { setEmail(e.target.value) }
    const handlePasswordChange = (e) => { setPassword(e.target.value) }


    const isValidEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const verifyForm = () => {
        if (name === "" || lastname === "" || password === "" || email === "") {
            setError('Uno o varios de los campos está vacío')
            setShowAlert(true)
            return false
        }
        if (!isValidEmail(email)) {
            setError('El correo electrónico no es válido')
            return false
        }
        else {
            return true;
        }
    }

    //register new user (post)
    const addNewUser = async (name, last_name, email, password) => {
        setError("")
        if (verifyForm() === true) {
            try {
                setLoading(true)
                const response = await fetch(`${URL}/createUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, last_name, email, password })
                });
                const data = await response.json();
                setLoading(false)
                console.log("usuario creado")
                navigate('/login')
                return data;

            } catch (err) {
                if (err.message === "Unexpected token 'E', \"Error creating user\" is not valid JSON") {
                    setLoading(false)
                    setError("Usuario en uso")
                    setShowAlert(true)
                }
            }
        }
    }

    return (
        <div className={RegisterCSS.main} >
            <Container className={RegisterCSS.container}>
                <Container className={RegisterCSS.subcontainer} >
                    <Row >
                        {<Alert variant='danger' show={showAlert} onClose={() => setShowAlert(false)} dismissible>{error}</Alert>}
                        <h1 className={RegisterCSS.h1}>Registro</h1>
                    </Row>
                    <Row >
                        <Form className='d-flex flex-column align-items-center justify-content-center' onSubmit={(e) => {
                            e.preventDefault(); // evita el envío automático del formulario y la recarga de la página
                            addNewUser(name, lastname, email, password);
                        }}>

                            <Form.Group className='p-2' as={Col} xs={12} md={12} lg={12} xl={12}>
                                <Form.Control type="text" placeholder='Name' onChange={handleNameChange} />
                            </Form.Group>
                            <Form.Group className='p-2' as={Col} xs={12} md={12} lg={12} xl={12}>
                                <Form.Control type="text" placeholder='Last Name' onChange={handleLastnameChange} />
                            </Form.Group>
                            <Form.Group className='p-2' as={Col} xs={12} md={12} lg={12} xl={12}>
                                <Form.Control type="email" placeholder='Email' onChange={handleEmailChange} />
                            </Form.Group>
                            <Form.Group className='p-2' as={Col} xs={12} md={12} lg={12} xl={12}>
                                <Form.Control type="password" placeholder='Contraseña' onChange={handlePasswordChange} />
                            </Form.Group>

                            <Form.Group className='p-2 text-center' as={Col} xs={12} md={12} lg={12} xl={12}>
                                <Button className={RegisterCSS.button} size='lg' disabled={loading} type='submit'>Crear Cuenta</Button>
                            </Form.Group>
                        </Form>
                    </Row>

                    <Row className='text-center' >
                        <span style={{ fontWeight: 'bolder', color: 'black' }}>¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link> </span>
                    </Row>
                </Container>
            </Container>
        </div>
    )
}
