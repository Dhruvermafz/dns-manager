import React, { useState, useEffect } from "react";
import { Button, Table, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../../api";
import { FaRemoveFormat, FaPen, FaTrash } from "react-icons/fa";
import "./record.css";

const DNSRecordsTable = ({ records, onDelete, setRecords }) => {
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

  const handleEdit = (id) => {
    history(`/dns-record/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/dns/${id}`);
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting DNS record: ", error);
    }
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
      Math.min(Math.ceil(filteredRecords.length / recordsPerPage), prevPage + 1)
    );
  };
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

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
                <td>
                  <Button variant="info" onClick={() => handleEdit(record._id)}>
                    <FaPen />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(record._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
                <td>{record.domain}</td>
                <td>{record.recordType}</td>
                <td>{record.value}</td>
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
