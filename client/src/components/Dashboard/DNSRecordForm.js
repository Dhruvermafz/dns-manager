import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import baseURL from "../../api";

const DNSRecordFormModal = ({ onSubmit, showModal, handleClose }) => {
  const [a, setA] = useState("");
  const [aaaa, setAaaa] = useState("");
  const [cname, setCname] = useState("");
  const [mx, setMx] = useState("");
  const [ns, setNs] = useState("");
  const [ptr, setPtr] = useState("");
  const [soa, setSoa] = useState("");
  const [srv, setSrv] = useState("");
  const [txt, setTxt] = useState("");
  const [dnssec, setDnssec] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/dns`, {
        a,
        aaaa,
        cname,
        mx,
        ns,
        ptr,
        soa,
        srv,
        txt,
        dnssec,
      });
      onSubmit(response.data);
      handleClose(); // Close the modal after submitting
      // Reset form fields
      setA("");
      setAaaa("");
      setCname("");
      setMx("");
      setNs("");
      setPtr("");
      setSoa("");
      setSrv("");
      setTxt("");
      setDnssec("");
    } catch (err) {
      console.log("Error adding DNS record: ", err);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New DNS Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>A (Address) Record:</Form.Label>
              <Form.Control
                type="text"
                value={a}
                onChange={(e) => setA(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>AAAA (IPv6 Address) Record:</Form.Label>
              <Form.Control
                type="text"
                value={aaaa}
                onChange={(e) => setAaaa(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>CNAME (Canonical Name) Record:</Form.Label>
              <Form.Control
                type="text"
                value={cname}
                onChange={(e) => setCname(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>MX (Mail Exchange) Record:</Form.Label>
              <Form.Control
                type="text"
                value={mx}
                onChange={(e) => setMx(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>NS (Name Server) Record:</Form.Label>
              <Form.Control
                type="text"
                value={ns}
                onChange={(e) => setNs(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>PTR (Pointer) Record:</Form.Label>
              <Form.Control
                type="text"
                value={ptr}
                onChange={(e) => setPtr(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>SOA (Start of Authority) Record:</Form.Label>
              <Form.Control
                type="text"
                value={soa}
                onChange={(e) => setSoa(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>SRV (Service) Record:</Form.Label>
              <Form.Control
                type="text"
                value={srv}
                onChange={(e) => setSrv(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>TXT (Text) Record:</Form.Label>
              <Form.Control
                type="text"
                value={txt}
                onChange={(e) => setTxt(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>DNSSEC:</Form.Label>
              <Form.Control
                type="text"
                value={dnssec}
                onChange={(e) => setDnssec(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DNSRecordFormModal;
