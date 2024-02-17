// routes/dnsRoutes.js
const express = require("express");
const router = express.Router();
const DNSRecord = require("../models/dnsRecord");

// Create DNS record
router.post("/dns", async (req, res) => {
  try {
    const dnsRecord = await DNSRecord.create(req.body);
    res.status(201).json(dnsRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all DNS records
router.get("/dns", async (req, res) => {
  try {
    const dnsRecords = await DNSRecord.find();
    res.json(dnsRecords);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read a specific DNS record by ID
router.get("/dns/:id", async (req, res) => {
  try {
    const dnsRecord = await DNSRecord.findById(req.params.id);
    if (!dnsRecord) {
      return res.status(404).json({ error: "DNS Record not found" });
    }
    res.json(dnsRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a DNS record by ID
router.put("/dns/:id", async (req, res) => {
  try {
    const dnsRecord = await DNSRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!dnsRecord) {
      return res.status(404).json({ error: "DNS Record not found" });
    }
    res.json(dnsRecord);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a DNS record by ID
router.delete("/dns/:id", async (req, res) => {
  try {
    const dnsRecord = await DNSRecord.findByIdAndDelete(req.params.id);
    if (!dnsRecord) {
      return res.status(404).json({ error: "DNS Record not found" });
    }
    res.json({ message: "DNS Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
