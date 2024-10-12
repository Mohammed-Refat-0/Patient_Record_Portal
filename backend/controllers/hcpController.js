// hcp controller functions

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Hcp from "../models/hcpModel.js";

// Post /api/hcp/login
// @access Public
// @desc login HCP
const loginHcp = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is required" });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "username and password are required" });
    }
    const hcp = await Hcp.findOne({ username });
    if (!hcp) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (!bcrypt.compareSync(password, hcp.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(res, hcp._id, 'hcp');
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post /api/hcp/logout
// @access Private
// @desc logout HCP
const logoutHcp = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    return res.status(200).json({ message: 'HCP logged out' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { loginHcp, logoutHcp };
