import Hcp from "../models/hcpModel.js";
import bcrypt from "bcryptjs";

// POST /api/admin/createhcp
// @access Private
// @desc create a new hcp
const createHcp = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }

    const { name, username, password, nationalId } = req.body;

    if (!name || !username || !password || !nationalId) {
      return res.status(400).json({ message: "name, username, password, and nationalId are required" });
    }

    const existingUsername = await Hcp.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "username already exists" });
    }

    const existingNationalId = await Hcp.findOne({ nationalId });
    if (existingNationalId) {
      return res.status(400).json({ message: "a user with this nationalId already exists" });
    }

    const hashed_password = bcrypt.hashSync(String(password), 9);
    const newHcp = new Hcp({
      name: String(name),
      username: String(username),
      password: hashed_password,
      nationalId: String(nationalId),
      title: "Doctor",
    });

    const hcp = await newHcp.save();
    return res.status(201).json({ message: `Hcp created successfully, ID: ${hcp._id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createHcp };
