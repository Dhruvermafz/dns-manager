import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../components/Navbar';


const MainLayout = ({ children }) => {
  return (
    <div className='relative bg-gray-50 min-h-screen'>
      <Navbar />
      <Container fluid className="pt-10">
        {children}
      </Container>
  
    </div>
  );
};

export default MainLayout;
