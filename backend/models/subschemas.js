// sub-schemas definitions for the models

import mongoose from "mongoose";
import File from './fileModel.js';

// sub-schema for weight-date pairs
const weightSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  date: { type: Date, required: true }
});

// sub-schema for diagnoses
const diagnosisSchema = new mongoose.Schema({
  diagnosis: { type: String, required: true },
  date: { type: Date, required: true }
});

// sub-schema for medications
const medicationSchema = new mongoose.Schema({
  medication: { type: String, required: true },
  dosage: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }
});

// sub-schema for past surgeries
const pastSurgerySchema = new mongoose.Schema({
  surgery: { type: String, required: true },
  date: { type: Date, required: true }
});

// sub-schema for scans
const scansSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  file: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "File" }
});

// sub-schema for labs
const labsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  file: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "File" }
});

export { weightSchema, diagnosisSchema, medicationSchema, pastSurgerySchema, scansSchema, labsSchema };
