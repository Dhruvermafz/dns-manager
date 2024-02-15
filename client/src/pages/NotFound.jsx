import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div className='py-16'>
              <h1 className='display-1 my-5'>404</h1>
              <h2 className='display-4'>The page you are looking for doesn't exist</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default NotFound;
