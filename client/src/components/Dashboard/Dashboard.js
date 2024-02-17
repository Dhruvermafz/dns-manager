import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DNSGcp from "./DNSGcp";
import api from "../../api";
import DNSRecordsTable from "./DNSRecordsTable";

const Dashboard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await api.get("/api/dns");
        setRecords(response.data);
      } catch (err) {
        console.log("Error fetching DNS records: ", err);
      }
    };
    fetchRecords();
  }, []);

  const handleAddRecord = (newRecord) => {
    setRecords([...records, newRecord]);
  };

  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record._id !== id));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>DNS Records</h2>
          <DNSRecordsTable
            records={records}
            onDelete={handleDeleteRecord}
            setRecords={setRecords}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <DNSGcp />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
