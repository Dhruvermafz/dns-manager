import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../api";

const DNSRecord = () => {
  const { id } = useParams(); // Fetching the ID from the URL params
  const [domain, setDomain] = useState("");
  const [recordType, setType] = useState("");
  const [value, setValue] = useState("");
  const history = useNavigate();

  useEffect(() => {
    // Fetch the DNS record based on the ID when the component mounts
    const fetchDNSRecord = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/dns/${id}`);
        const { domain, recordType, value } = response.data;
        setDomain(domain);
        setType(recordType);
        setValue(value);
      } catch (error) {
        console.error("Error fetching DNS record: ", error);
      }
    };
    fetchDNSRecord();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/dns/${id}`, {
        domain,
        recordType,
        value,
      });
      console.log("DNS record updated:", response.data);
      history("/");
    } catch (err) {
      console.error("Error updating DNS record: ", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Update DNS Record</h2>
      <Form style={styles.form}>
        <Form.Group controlId="domain" style={styles.formGroup}>
          <Form.Control
            type="text"
            placeholder="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
            style={styles.input}
          />
        </Form.Group>

        <Form.Group controlId="recordType" style={styles.formGroup}>
          <Form.Control
            as="select"
            value={recordType}
            onChange={(e) => setType(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select Type</option>
            <option value="a">A (Address)</option>
            <option value="aaaa">AAAA (IPv6 Address)</option>
            <option value="cname">CNAME (Canonical Name)</option>
            <option value="mx">MX (Mail Exchange)</option>
            <option value="ns">NS (Name Server)</option>
            <option value="ptr">PTR (Pointer)</option>
            <option value="soa">SOA (Start of Authority)</option>
            <option value="srv">SRV (Service)</option>
            <option value="txt">TXT (Text)</option>
            <option value="dnssec">DNSSEC</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="value" style={styles.formGroup}>
          <Form.Control
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            style={styles.input}
          />
        </Form.Group>

        <Button variant="warning" onClick={handleUpdate} style={styles.button}>
          Update
        </Button>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "auto",
    paddingTop: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginRight: "10px",
    backgroundColor: "black",
  },
};

export default DNSRecord;
