// admin model

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
