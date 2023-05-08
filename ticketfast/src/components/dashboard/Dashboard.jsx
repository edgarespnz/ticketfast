import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import DashboardCSS from './Dashboard.module.css'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import URL from '../../enviroment';


export default function Dashboard() {

    const [anpList, setAnpList] = useState([]);
    const isLoggedIn = localStorage.getItem('user')
    const navigate = useNavigate()


    //fetch de productos
    const httpAnps = async () => {
        const response = await fetch(`${URL}/anp`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAnpList(data);
    };

    useEffect(() => {
        try {
            httpAnps();
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn === undefined) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])

    const cardConstructor = (productId, name, image, price) => {
        return (
            <Card className='p-3' style={{ width: '100%', height: '100%' }}>
                <Card.Title>{name}</Card.Title>
                <Card.Img src={image} className={DashboardCSS.image} />
                <Card.Body>
                    <Row >
                        <Col xs={12} sm={8} md={8} lg={6} xl={8}>
                            <Button className={DashboardCSS.button} variant='warning'
                                onClick={() => navigate(`/product/${productId}`)}>Comprar</Button>
                        </Col>

                        <Col className='d-flex justify-content-center' xs={12} sm={4} md={4} lg={4} xl={4}>
                            <div style={{ fontWeight: 'bold' }}>{price} PEN</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        );
    }

    return (
        <div className={DashboardCSS.body}>
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>Listado de ANPs</p>
            </div>

            <div className={DashboardCSS.pagecontent}>
                <Row>
                    {anpList.length > 0 && anpList.map((item) => {
                        return (
                            <Col className='p-5' xs={12} sm={10} md={6} lg={6} xl={4}>
                                {cardConstructor(item.id, item.name, item.image, item.price)}
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>

    )
}