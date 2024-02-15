const dnsRecord = require("../models/dnsRecord");

exports.add = async (req, res) => {
  try {
    const { value, type } = req.body.data;
    const email = req.decodedToken.email;
    const newRecord = new dnsRecord({ value, type, email });
    await newRecord.save();

    res
      .status(201)
      .json({ message: "Reocrd saved successfully", id: newRecord._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};

exports.edit = async (req, res) => {
  const idToUpdate = req.body.data.id;
  const updatedType = req.body.data.type;
  const updatedValue = req.body.data.value;

  try {
    await dnsRecord.updateOne(
      {
        _id: idToUpdate,
      },
      {
        $set: {
          value: updatedValue,
          type: updatedType,
        },
      }
    );

    res.status(201).json({ msg: "Updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ msg: err });
  }
};

exports.get = async (req, res) => {
  try {
    const email = await dnsRecord.find({ email: email });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err: err });
  }
};

exports.delete = async (req, res) => {
  const idToDelete = req.params.id;

  try {
    await dnsRecord.deleteOne({ _id: idToDelete });
    res.status(200).json({ msg: "Successfully Deleted" });
  } catch (err) {
    console.log(err);
    res.json({ msg: err });
  }
};
