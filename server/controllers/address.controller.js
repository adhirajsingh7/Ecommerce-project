const { Address } = require("../models/address");

exports.get_addresses = async (req, res, next) => {
  let { page = 0, limit = 10, name = "" } = req.query;
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 10;

  let offset = page * limit;

  try {
    const response = await Address.find()
      .limit(limit * 1)
      .skip(offset)
      .exec();

    const count = await Address.find().countDocuments();

    return res.status(200).send({
      total: count,
      total_page: Math.ceil(count / limit),
      current_page: page,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.get_address_by_id = async (req, res, next) => {
  const { Address_id } = req.params;

  try {
    const response = await Address.findOne({ _id: Address_id });
    if (!response) throw new Error("Address not found.");
    return res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.create_address = async (req, res, next) => {
  const address = req.body;

  try {
    const response = await Address.create(address);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.update_address = async (req, res, next) => {
  const { address_id } = req.params;
  const address = req.body;

  try {
    const response = await Address.findOneAndUpdate({ _id: address_id }, address);
    res.status(200).json({ message: "Address updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.delete_address = async (req, res, next) => {
  const { address_id } = req.params;
  
  try {
    const response = await Address.findOneAndDelete({ _id: address_id });
    return res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
