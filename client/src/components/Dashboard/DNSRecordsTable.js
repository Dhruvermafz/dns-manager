import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Form, Row, Col, Modal } from "react-bootstrap";
import api from "../../api";
import DNSRecordFormModal from "./DNSRecordForm";
import Search from "../Search";
const DNSRecordsTable = ({ records, onDelete, setRecords }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const users = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const [savedUsers, setSavedUsers] = useState(users);
  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  // const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal

  // Pagination
  const paginate = (page) => {
    setCurrentPage(page);
  };
  const search = (term) => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedUsers.filter((user) =>
        Object.keys(user).some((key) =>
          user[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedUsers });
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleFormSubmit = async (data) => {
    try {
      // Make API call to add new DNS record
      const response = await api.post("/dns-records", data);
      const newRecord = response.data;
      setRecords([...records, newRecord]);
      handleClose();
    } catch (error) {
      console.error("Error adding DNS record: ", error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dns-records/${id}`);
      onDelete(id);
    } catch (error) {
      console.error("Error deleting DNS record: ", error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleSearch = () => {
    // Implement search logic
    // This logic seems to filter records locally, consider optimizing if dealing with large datasets
    const filteredRecords = records.filter((record) =>
      Object.values(record).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setRecords(filteredRecords);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    // Reset records to the original list
    // Alternatively, you might want to refetch records from the server
    // setRecords(originalRecords);
  };

  return (
    <>
      {/* Search and Add Buttons */}
      <Row className="toolbar">
        <Col md={4}>
          <Search search={search} resetSearch={search} />
        </Col>

        <Col md={4}>
          <button className="primary-btn" onClick={handleShow}>
            Create New DNS
          </button>
        </Col>
      </Row>

      {/* DNS Records Table */}
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
              {/* Add other table headers */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
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
                {/* Add other table cells */}
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

      {/* Modal for adding new DNS record */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New DNS Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DNSRecordFormModal onSubmit={handleFormSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DNSRecordsTable;
