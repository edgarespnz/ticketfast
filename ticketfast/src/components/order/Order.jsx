import React, { useState, useEffect } from 'react'
import DashboardCSS from '../dashboard/Dashboard.module.css'
import ConfirmationCSS from '../confirmation/Confirmation.module.css'
import Header from '../header/Header'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import URL from '../../enviroment'

export default function Order() {
    const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart'))
    const navigate = useNavigate() 
    const randomId = Math.floor(Math.random() * 90000) + 10000;


    const handleClickButton = async () => {
        setLoading(true)
        const email = user.body.user.email;

        const data = {
            to: email,
            subject: 'Confirmación de orden',
            body: {
                userName: user.body.user.name,
                orderNumber: cart.id,
                totalPrice: cart.price,
                ticketCount: cart.quantity
            }
        };
        try {
            const response = await fetch(`${URL}/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setLoading(false)
                navigate('/confirmation');
            } else {
                setLoading(false)
                console.error(`Error al enviar el correo: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            setLoading(false)
            console.error(`Error al enviar el correo: ${error}`);
        }
    };


    const handleGoBackButton = () => { navigate('/dashboard') }


    useEffect(() => {
        if (user === undefined) {
            navigate('/login')
        }
    }, [])


    return (
        <div>
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>RESUMEN DE TU ORDEN</p>
            </div>

            <div className={ConfirmationCSS.pagecontent}>
                <Container >
                    <Row className="justify-content-md-center">
                        <Col className='text-center p-5' md="auto" style={{ backgroundColor: 'white' }}>
                            <div className='mb-3'>
                                <h2>Gracias por tu compra <h2 style={{ color: 'green', textTransform: 'uppercase' }}>{user.body.user.name}!</h2></h2>
                            </div>

                            <div className='mb-3'>
                                <h2>VERIFICA QUE TU ORDEN ES CORRECTA</h2>
                            </div>

                            <div className='d-flex align-items-center justify-content-center'>
                                <h3 style={{ marginRight: '0.5rem' }}>Boleto para: </h3>
                                <h3 style={{ color: 'green' }}>{cart.name}</h3>
                            </div>

                            <div className='d-flex align-items-center justify-content-center'>
                                <h3 style={{ marginRight: '0.5rem' }}>Cantidad: </h3>
                                <h3 style={{ color: 'green' }}>{cart.quantity}</h3>
                            </div>

                            <div className='d-flex align-items-center justify-content-center'>
                                <h3 style={{ marginRight: '0.5rem' }}>Precio total: </h3>
                                <h3 style={{ color: 'green' }}>{cart.price} PEN</h3>
                            </div>

                            <div className='mt-5'>
                                <p style={{ fontStyle: 'oblique' }}>Da click en "Realizar la orden" para poder finalizar la compra , se enviará un correo con la orden</p>
                            </div>
                            <Row >
                                <Col className='pt-5'>
                                    <Button variant='light' onClick={() => handleGoBackButton()}>{"<<"} Volver </Button>
                                </Col>
                                <Col className='pt-5'>
                                    <Button disabled={loading} variant='success' onClick={() => handleClickButton()}>Realizar la Orden {">>"}</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    )
}
