import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, Row, Col, Modal } from "react-bootstrap";
import api from "../../api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DNSRecordsTable = ({ records, onDelete, setRecords }) => {
  const dispatch = useDispatch();

  const [dnsRecords, setDNSRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
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
    history("/create-dns");
  };

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(Math.ceil(dnsRecords.length / recordsPerPage), prevPage + 1)
    );
  };
  const totalPages = Math.ceil(dnsRecords.length / recordsPerPage);

  // const handleFormSubmit = async (data) => {
  //   try {
  //     const response = await api.post(`/dns`, data);
  //     const newRecord = response.data;
  //     setRecords([...records, newRecord]);
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error adding DNS record: ", error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/dns/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting DNS record: ", error);
    }
  };

  return (
    <>
      <Row className="toolbar">
        <Col md={4}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by domain"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="page-number">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={goToNextPage}
              disabled={indexOfLastRecord >= dnsRecords.length}
            >
              Next
            </button>
          </div>
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
              <th>Action</th>
              <th>Domain</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.a}</td>
                <td>{record.domain}</td>
                <td>{record.recordType}</td>
                <td>{record.value}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(record._id)}
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
    </>
  );
};

export default DNSRecordsTable;
