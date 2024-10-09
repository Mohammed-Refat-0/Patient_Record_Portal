// patient model

import mongoose from "mongoose";
import Admin from "./adminModel.js";
import {
  weightSchema, diagnosisSchema, medicationSchema,
  pastSurgerySchema, scansSchema, labsSchema
} from "./subschemas.js";

const patientSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nationalId: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: Admin },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    contactNumber: { type: String },

    medicalInfo:
    {
      bloodType: { type: String },
      weight: { type: [weightSchema] },
      height: { type: Number },
      allergies: { type: [String] },
      pastSurgeries: { type: [pastSurgerySchema] },
      medications: { type: [medicationSchema] },
      chroniciIlnesses: { type: [String] },
      disabilities: { type: [String] },
      diagnoses: { type: [diagnosisSchema] },
      scans: { type: [scansSchema] },
      labs: { type: [labsSchema] },
    },
  },

  { timestamps: true }
);

const Patient = mongoose.model("patient", patientSchema);
export default Patient;
