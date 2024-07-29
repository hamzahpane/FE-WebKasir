import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button } from 'react-bootstrap';

function CardMenu() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://203.194.113.156/api/products');
                setProducts(response.data.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Row xs={10} md={4} className="g-4">
            {products.map(product => (
                <Col key={product._id}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img src={`http://203.194.113.156/images/products/${product.image_url}`} style={{ width: '100%', height: '200px' }} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                {product.description}
                            </Card.Text>
                            <Button variant="primary">Tambahkan</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default CardMenu;
