import React from "react";
import { Container, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container className="about-container">
      <Card className="about-card">
        <Card.Body>
          <Card.Title className="about-title">About DNS Manager</Card.Title>
          <Card.Text className="about-text">
            DNS Manager is a web application designed to help users manage their
            Domain Name System (DNS) records efficiently.
          </Card.Text>
          <Card.Text className="about-text">
            It provides features to add, edit, and delete DNS records, making it
            easier for users to maintain their domain configurations.
          </Card.Text>
          <Card.Text className="about-text">
            DNS Manager is built using React.js for the frontend and Node.js for
            the backend. It utilizes React Bootstrap for UI components to ensure
            a responsive and user-friendly interface.
          </Card.Text>
          <Card.Text className="about-text">
            The application fetches data from the server using RESTful API calls
            and allows users to perform CRUD (Create, Read, Update, Delete)
            operations on DNS records.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
