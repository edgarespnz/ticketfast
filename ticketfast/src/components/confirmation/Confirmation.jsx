import React from 'react'
import Header from '../header/Header'
import DashboardCSS from '../dashboard/Dashboard.module.css'
import { Row, Col, Container, Button } from 'react-bootstrap'
import ConfirmationCSS from './Confirmation.module.css'
import { useNavigate } from 'react-router-dom'

export default function Confirmation() {

    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>COMPRA FINALIZADA</p>
            </div>

            <div className={ConfirmationCSS.pagecontent}>


                <Container >
                    <Row className="justify-content-md-center">
                        <Col  className='text-center p-5' md="auto" style={{ backgroundColor: 'white' }}>
                            <h2>FELICIDADES !</h2>
                            <i className="fa-solid fa-circle-check fa-beat fa-8x p-2" style={{ color: "#2aa711" }}></i>
                            <p>Tu compra ha sido concretada</p>
                            <span>
                                Revisa tu correo para ver
                                la información de tu compra
                            </span>
                            <Row >
                                <Col>
                                </Col>
                                <Col className='pt-5'>
                                    <Button variant='light' onClick={()=>navigate('/dashboard')} >Volver a inicio {">>"}</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div>
    )
}
