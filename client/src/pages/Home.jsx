import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap'; // Import React-Bootstrap components
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn, user } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${user.name}'s tasks` : "Task Manager";
  }, [isLoggedIn, user.name]);

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <Card fluid className='bg-primary text-white text-center'>
          <Container>
            <h1 className='display-4'>Welcome to Task Manager App</h1>
            <p className='lead mt-3'>Join now to manage your tasks</p>
            <Link to="/signup" className='btn btn-lg btn-outline-light mt-3'>
              Join Now
            </Link>
          </Container>
        </Card>
      ) : (
        <Container className='mt-4'>
          <h1 className='text-lg mb-4'>Welcome {user.name}</h1>
          <Tasks />
        </Container>
      )}
    </MainLayout>
  );
}

export default Home;
