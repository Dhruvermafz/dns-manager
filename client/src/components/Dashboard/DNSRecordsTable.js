import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, Row, Col, Modal } from "react-bootstrap";
import api from "../../api";
import DNSRecordFormModal from "./DNSRecordForm";
import Search from "../Search";
import CreateDNS from "../CreateDNS";
import { Link, useNavigate } from "react-router-dom";

const DNSRecordsTable = ({ records, onDelete, setRecords }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const history = useNavigate();
  useEffect(() => {
    setFilteredRecords(
      records.filter((record) =>
        Object.values(record)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, records]);
  const handleCreateDNSPage = () => {
    history.push("/create-dns");
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleFormSubmit = async (data) => {
    try {
      const response = await api.post(`/dns`, data);
      const newRecord = response.data;
      setRecords([...records, newRecord]);
      handleClose();
    } catch (error) {
      console.error("Error adding DNS record: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dns-records/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting DNS record: ", error);
    }
  };

  return (
    <>
      <Row className="toolbar">
        <Col md={4}>
          <Search setSearchTerm={setSearchTerm} />
        </Col>
        <Col md={4}>
          <Link to="/create-dns">
            <Button className="primary-btn" onClick={handleCreateDNSPage}>
              Create New DNS
            </Button>
          </Link>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>A (Address)</th>
              <th>AAAA (IPv6 Address)</th>
              <th>CNAME</th>
              <th>MX</th>
              <th>NS</th>
              <th>PTR</th>
              <th>SOA</th>
              <th>SRV</th>
              <th>TXT</th>
              <th>DNSSEC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.a}</td>
                <td>{record.aaaa}</td>
                <td>{record.cname}</td>
                <td>{record.mx}</td>
                <td>{record.ns}</td>
                <td>{record.ptr}</td>
                <td>{record.soa}</td>
                <td>{record.srv}</td>
                <td>{record.txt}</td>
                <td>{record.dnssec}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(filteredRecords.length / recordsPerPage) },
          (_, i) => (
            <li key={i} className="page-item">
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>

      <Modal show={showModal} onHide={handleClose}>
        <DNSRecordFormModal onSubmit={handleFormSubmit} />
      </Modal>
    </>
  );
};

export default DNSRecordsTable;
