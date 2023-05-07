import React from 'react'
import { Alert, Button, Form, Container } from 'react-bootstrap'
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
    const [error , setError] = useState();

    const navigate = useNavigate();

    //form control handlers
    const handleNameChange = (e) => { setUsername(e.target.value) }
    const handleLastnameChange = (e) => { setLastname(e.target.value) }
    const handleEmailChange = (e) => { setEmail(e.target.value) }
    const handlePasswordChange = (e) => { setPassword(e.target.value) }


    const isValidEmail = () => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      const verifyForm =()=>{
        if(name === "" || lastname === "" || password === ""  ){
            setError('Uno o varios de los campos está vacío')
            setShowAlert(true)
            return false
        }
        if(!isValidEmail(email)) {
            setError('El correo electrónico no es válido')
            return false
        }
        else{
            return true;
        }
    }

    //register new user (post)
    const addNewUser =  async (name, last_name, email, password) => {
       if(verifyForm() === true){
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
            setLoading(false)
            console.error(err);
        }
       }
    }

    return (
        <div className="main p-5 d-flex align-content-center justify-content-center" >
            <Container className={RegisterCSS.container}>
                <Container className={RegisterCSS.subcontainer} >
                    {<Alert variant='danger' show={showAlert} onClose={() => setShowAlert(false)} dismissible>{error}</Alert>}
                    <h1 className={RegisterCSS.h1}>Registro</h1>
                    <Form onSubmit={(e) => {
                        e.preventDefault(); // evita el envío automático del formulario y la recarga de la página
                        addNewUser(name, lastname, email, password);
                    }}>
                        <Form.Group>
                            <Form.Control className={RegisterCSS.formgroup} type="text" placeholder='Name' onChange={handleNameChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={RegisterCSS.formgroup} type="text" placeholder='Last Name' onChange={handleLastnameChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={RegisterCSS.formgroup} type="email" placeholder='Email' onChange={handleEmailChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className={RegisterCSS.formgroup} type="password" placeholder='Contraseña' onChange={handlePasswordChange} />
                        </Form.Group>

                        <div className="d-grid mb-3">
                            <Button className={RegisterCSS.button} size='lg' disabled={loading} type='submit'>Crear Cuenta</Button>
                        </div>

                        <div className='text-center'>
                            <span>¿Ya tienes cuenta? <Link to={'/login'}>Inicia sesión</Link> </span>
                        </div>
                    </Form>
                </Container>
            </Container>
        </div>
    )
}
