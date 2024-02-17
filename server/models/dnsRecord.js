const mongoose = require("mongoose");

const dnsRecordSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  recordType: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const DNSRecord = mongoose.model("DNSRecord", dnsRecordSchema);

module.exports = DNSRecord;
