import React from 'react'
import Header from '../header/Header'
import DashboardCSS from './Dashboard.module.css'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

export default function Dashboard() {

    const productos = [
        {
            "title": "Bosque Berlín",
            "imageUrl": "https://www.conservamospornaturaleza.org/img/2013/03/refugio-2-1.jpg",
            "price": 20
        },
        {
            "title": "Kakiriuka",
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6m3JFEDpBhibyMpT9-prd4kmLGpf5gyC3nZeZJZ8OL6_RcSakXIz4BHGGR67MdBUl4Q&usqp=CAU",
            "price": 18
        },
        {
            "title": "Sabaullo",
            "imageUrl": "https://elcomercio.pe/resizer/WYC2UA9xrBCxnYqbzxjgkACqo_E=/980x0/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/2EN6MYPMM5G45DHVPHN5MU44AQ.jpg",
            "price": 22
        }
    ];

    const cardConstructor = (title, imageUrl, price) => {
        return (
            <div className={DashboardCSS.cardcontainer}>
                <Card className='p-3' style={{ width: '35rem', height: '30rem' }}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Img src={imageUrl} className={DashboardCSS.image} />
                    <Card.Body>
                        <Card.Text className={DashboardCSS.cardtext}>
                            <Button className={DashboardCSS.cardtext} variant='warning'>Comprar</Button>
                            <h2>{price} PEN</h2>
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
                        {productos.map((item) => {
                            return (
                                <Col>
                                    {cardConstructor(item.title, item.imageUrl, item.price)}
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </div>

    )
}