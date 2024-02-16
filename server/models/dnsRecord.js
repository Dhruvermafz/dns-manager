const mongoose = require("mongoose");

const dnsRecordSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  a: String,
  aaaa: String,
  cname: String,
  mx: String,
  ns: String,
  ptr: String,
  soa: String,
  srv: String,
  txt: String,
  dnssec: String,
});

const dnsRecord = mongoose.model("dnsRecord", dnsRecordSchema);

export default dnsRecord;
