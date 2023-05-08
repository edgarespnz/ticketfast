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
    }, [navigate, user])


    return (
        <div>
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>RESUMEN DE TU ORDEN</p>
            </div>

            <div className={ConfirmationCSS.pagecontent}>
                <Container className='text-center p-5' style={{ backgroundColor: 'white', maxWidth: '400px' }} >
                    <Row >
                        <h2 style={{ color: 'green', textTransform: 'uppercase' }}>Gracias {user.body.user.name}!</h2>
                    </Row>

                    <Row>
                        <h2>VERIFICA QUE TU ORDEN ES CORRECTA</h2>
                    </Row>

                    <Row >
                        <h3 style={{ color: 'green' }}>Boleto para: {cart.name}</h3>
                    </Row>

                    <Row>
                        <h3 style={{ color: 'green' }}>Cantidad: {cart.quantity}</h3>
                    </Row>

                    <Row>
                        <h3 style={{ color: 'green' }}>Precio total:{cart.price} PEN</h3>
                    </Row>

                    <Row>
                        <p style={{ fontStyle: 'oblique' }}>Da click en "Realizar la orden" para poder finalizar la compra , se enviará un correo con la orden</p>
                    </Row>

                    <Row>
                        <Col xs={5} sm={5} md={5} lg={5} xl={5}>
                            <Button variant='light' onClick={() => handleGoBackButton()}>{"<<"} Volver </Button>
                        </Col>
                        <Col >
                            <Button disabled={loading} variant='success' onClick={() => handleClickButton()}>Realizar la Orden {">>"}</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
