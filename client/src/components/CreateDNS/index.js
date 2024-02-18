import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../api";
import Loader from "../Loader";
const CreateDNS = ({ onSubmit }) => {
  const [domain, setDomain] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseURL}/api/dns`, {
        domain,
        type,
        value,
      });
      onSubmit(response.data);
      setDomain("");
      setType("");
      setValue("");
      console.log("New DNS record created:", response.data);
      navigate("/");
    } catch (err) {
      console.error("Error adding DNS record: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Create DNS Record</h2>
      <Form style={styles.form} onSubmit={handleSubmit}>
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
        <Form.Group controlId="type" style={styles.formGroup}>
          <Form.Control
            as="select"
            value={type}
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
        <Button
          variant="primary"
          style={styles.button}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Submit"} {/* Use Loader component */}
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
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default CreateDNS;
