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
                <Col  xs={8} sm={10} md={10} lg={10} xl={10}>
                    <h1 className={HeaderCSS.h1}>
                        TICKET-FAST <i class="fa-solid fa-ticket" color='white'></i>
                    </h1>
                </Col>
                <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                    <Button variant='danger' size='lg' onClick={logout} >Logout</Button>
                </Col>
            </Row>
        </div>
    )
}
