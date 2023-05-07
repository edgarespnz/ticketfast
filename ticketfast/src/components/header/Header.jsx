import React from 'react'
import HeaderCSS from './Header.module.css'
import { Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <div className={HeaderCSS.main} style={{ alignSelf: 'end' }}>
            <Row>
                <Col sm={8} md={10} lg={10} xs={8}>
                    <h1 className={HeaderCSS.h1}>
                        TICKET-FAST <i class="fa-solid fa-ticket" color='white'></i>
                    </h1>
                </Col>
                <Col>
                    <Button variant='danger' size='lg' onClick={logout} >Logout</Button>
                </Col>
            </Row>
        </div>
    )
}
