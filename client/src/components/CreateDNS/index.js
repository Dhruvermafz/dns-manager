import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const CreateDNS = () => {
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
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/dns-records", {
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
      console.log("New DNS record created:", response.data);
      history.push("/dns-records"); // Redirect to DNS records page after submission
    } catch (err) {
      console.error("Error adding DNS record: ", err);
    }
  };

  return (
    <div>
      <h2>Create DNS Record</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="a">
          <Form.Label>A (Address) Record:</Form.Label>
          <Form.Control
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="aaaa">
          <Form.Label>AAAA (IPv6 Address) Record:</Form.Label>
          <Form.Control
            type="text"
            value={aaaa}
            onChange={(e) => setAaaa(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="cname">
          <Form.Label>CNAME (Canonical Name) Record:</Form.Label>
          <Form.Control
            type="text"
            value={cname}
            onChange={(e) => setCname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="mx">
          <Form.Label>MX (Mail Exchange) Record:</Form.Label>
          <Form.Control
            type="text"
            value={mx}
            onChange={(e) => setMx(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="ns">
          <Form.Label>NS (Name Server) Record:</Form.Label>
          <Form.Control
            type="text"
            value={ns}
            onChange={(e) => setNs(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="ptr">
          <Form.Label>PTR (Pointer) Record:</Form.Label>
          <Form.Control
            type="text"
            value={ptr}
            onChange={(e) => setPtr(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="soa">
          <Form.Label>SOA (Start of Authority) Record:</Form.Label>
          <Form.Control
            type="text"
            value={soa}
            onChange={(e) => setSoa(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="srv">
          <Form.Label>SRV (Service) Record:</Form.Label>
          <Form.Control
            type="text"
            value={srv}
            onChange={(e) => setSrv(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="txt">
          <Form.Label>TXT (Text) Record:</Form.Label>
          <Form.Control
            type="text"
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="dnssec">
          <Form.Label>DNSSEC:</Form.Label>
          <Form.Control
            type="text"
            value={dnssec}
            onChange={(e) => setDnssec(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateDNS;
