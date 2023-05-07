import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import DashboardCSS from './Dashboard.module.css'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {

    const [anpList , setAnpList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user'));
    const navigate = useNavigate()


    //fetch de productos
    const httpAnps = async () => {
        const response = await fetch("http://localhost:3001/anp");
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

      useEffect(()=>{
        if(isLoggedIn === undefined){
           navigate('/login')
        }
      },[])

    const cardConstructor = (productId, name, image, price) => {
        return (
            <div className={DashboardCSS.cardcontainer}>
                <Card className='p-3' style={{ width: '35rem', height: '30rem' }}>
                    <Card.Title>{name}</Card.Title>
                    <Card.Img src={image} className={DashboardCSS.image} />
                    <Card.Body>
                        <Card.Text className={DashboardCSS.cardtext}>
                            <Button className={DashboardCSS.cardtext} variant='warning' 
                            onClick={()=>navigate(`/product/${productId}`)}>Comprar</Button>
                            <h3>{price} PEN</h3>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    return (
        <div className={DashboardCSS.body}>
            <Header />
            <div className={DashboardCSS.announcecontainer}>
                <p className='p-2'>Listado de ANPs</p>
            </div>

            <div className={DashboardCSS.pagecontent}>
                <div className={DashboardCSS.contentoverlay}>
                    <Row>
                        {anpList.length > 0 && anpList.map((item) => {
                            return (
                                <Col>
                                    {cardConstructor(item.id, item.name, item.image, item.price)}
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </div>

    )
}