import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../api";
const DNSGcp = () => {
  const [dnsRecords, setDNSRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDNSRecords() {
      try {
        const response = await axios.get(`${baseURL}/api/dns`);
        setDNSRecords(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchDNSRecords();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="mb-3">DNS Records of GCP</h2>
      <ListGroup>
        {dnsRecords.map((record, index) => (
          <ListGroup.Item key={index}>
            {record.name} - {record.type}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default DNSGcp;
