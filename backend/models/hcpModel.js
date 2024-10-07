// healthcare professional model

import mongoose from "mongoose";
import Admin from "./adminModel.js";

const hcpSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nationalId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: Admin },
},
  {
    timestamps: true,
  }
);

const Hcp = mongoose.model("Hcp", hcpSchema);
export default Hcp;
