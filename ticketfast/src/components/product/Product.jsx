import React from 'react'
import { useState, useEffect } from 'react'
import ProductCSS from './Product.module.css'
import Header from '../header/Header'
import DashboardCSS from '../dashboard/Dashboard.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, Container } from 'react-bootstrap'
import URL from '../../enviroment'

export default function Product() {
    const [product, setProduct] = useState({})
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1)
    const isLoggedIn = localStorage.getItem('user')
    const navigate = useNavigate()

    const getAnpById = async (id) => {
        try {
            const response = await fetch(`${URL}/anp/${id}`);
            const data = await response.json();
            setProduct(data)
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const handleSetOrder = () => {
        localStorage.setItem("cart", JSON.stringify({ "id": product.id, "name": product.name, "quantity": quantity, "price": (product.price) * quantity }));
        navigate(`/order/${id}`);
    };



    useState(() => {
        try {
            getAnpById(id)
        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        if (isLoggedIn === undefined) {
            navigate('/login')
        }
    }, [isLoggedIn, navigate])


    return (
        <div>
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>Detalle de la ANP</p>
            </div>

            <div className={ProductCSS.pagecontent}>
                <div className={ProductCSS.overlay}></div>
                <Container className={ProductCSS.productcontainer}>
                    <Row >
                        <Col xs={12} sm={12} md={12} lg={6}>
                            <img className='p-3 ' src={product.image} alt="450x450px" style={{ width: '100%', height: '100%' }} />
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={6} className='d-flex flex-column'>
                            <Row className="align-items-center my-4">
                                <Col>
                                    <h1>{product.name}</h1>
                                </Col>
                            </Row>

                            <Row className="align-items-center my-4">
                                <Col>
                                    <p>{product.description}</p>
                                </Col>
                            </Row>

                            <Row className="align-items-center my-4">
                                <Row className='d-flex align-items-center justify-content-start' md="auto">
                                    <Col>
                                        <h5>Cantidad: </h5>
                                    </Col>

                                    <Col className='d-flex align-items-center justify-content-evenly'>
                                        <Button variant='dark' onClick={() => setQuantity(quantity <= 1 ? 1 : quantity - 1)}>-</Button>
                                        <h5 className='p-2'>{quantity}</h5>
                                        <Button variant='dark' onClick={() => setQuantity(quantity + 1)}>+</Button>
                                    </Col>
                                    <Col>
                                        <span>Importe total: <span className='text-success ' style={{ fontWeight: 'bolder' }}>{(product.price) * quantity}</span> PEN</span>
                                    </Col>
                                </Row>
                            </Row>
                            <Row>
                                <Col className='d-flex align-items-center justify-content-end p-3'>
                                    <Button
                                        size='lg' variant='warning'
                                        style={{ border: 'none', borderRadius: '0', color: 'white' }}
                                        onClick={handleSetOrder}>
                                        Comprar
                                    </Button>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>


    )
}


