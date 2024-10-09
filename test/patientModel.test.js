// test suite for patient model

import mongoose from 'mongoose';
import Patient from '../backend/models/patientModel.js';
import Admin from '../backend/models/adminModel.js';
import dotenv from "dotenv";
dotenv.config()

describe('Patient Model Test', () => {
  let savedAdmin;
  let savedPatientId;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);

    const admin = new Admin({
      name: 'Admin1',
      password: 'password123',
      nationalId: '12345890'
    });
    savedAdmin = await admin.save();

    // Create and save a patient for reference
    const patientData = {
      name: 'Patient',
      password: 'password123',
      nationalId: '123457890',
      createdBy: savedAdmin._id,
      gender: 'Male',
      dateOfBirth: new Date('1990-01-01'),
      contactNumber: '1234567890',
      medicalInfo: {
        bloodType: 'O+',
        weight: [{ weight: 70, date: new Date() }],
        height: 180,
        allergies: ['Pollen'],
        pastSurgeries: [{ surgery: 'Appendectomy', date: new Date() }],
        medications: [{ medication: 'Ibuprofen', dosage: '200mg', startDate: new Date() }],
        chroniciIlnesses: ['Diabetes'],
        disabilities: ['None'],
        diagnoses: [{ diagnosis: 'Hypertension', date: new Date() }],
        scans: [{ name: 'X-Ray', date: new Date(), file: new mongoose.Types.ObjectId() }],
        labs: [{ name: 'Blood Test', date: new Date(), file: new mongoose.Types.ObjectId() }]
      }
    };
    const validPatient = new Patient(patientData);
    const savedPatient = await validPatient.save();
    savedPatientId = savedPatient._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save a patient successfully', async () => {
    const patientData = {
      name: 'Patient Name',
      password: 'password123',
      nationalId: '0987654321',
      createdBy: savedAdmin._id,
      gender: 'Male',
      dateOfBirth: new Date('1990-01-01'),
      contactNumber: '1234567890',
      medicalInfo: {
        bloodType: 'O+',
        weight: [{ weight: 70, date: new Date() }],
        height: 180,
        allergies: ['Pollen'],
        pastSurgeries: [{ surgery: 'Appendectomy', date: new Date() }],
        medications: [{ medication: 'Ibuprofen', dosage: '200mg', startDate: new Date() }],
        chroniciIlnesses: ['Diabetes'],
        disabilities: ['None'],
        diagnoses: [{ diagnosis: 'Hypertension', date: new Date() }],
        scans: [{ name: 'X-Ray', date: new Date(), file: new mongoose.Types.ObjectId() }],
        labs: [{ name: 'Blood Test', date: new Date(), file: new mongoose.Types.ObjectId() }]
      }
    };
    const validPatient = new Patient(patientData);
    const savedPatient = await validPatient.save();

    expect(savedPatient._id).toBeDefined();
    expect(savedPatient.name).toBe(patientData.name);
    expect(savedPatient.password).toBe(patientData.password);
    expect(savedPatient.nationalId).toBe(patientData.nationalId);
    expect(savedPatient.createdBy).toEqual(savedAdmin._id);
    expect(savedPatient.gender).toBe(patientData.gender);
    expect(savedPatient.dateOfBirth).toEqual(patientData.dateOfBirth);
    expect(savedPatient.contactNumber).toBe(patientData.contactNumber);
    expect(savedPatient.medicalInfo.bloodType).toBe(patientData.medicalInfo.bloodType);
  });

  it('should fail to create a patient without required fields', async () => {
    const patientWithoutRequiredField = new Patient({ name: 'Patien' });
    let err;
    try {
      await patientWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    expect(err.errors.nationalId).toBeDefined();
    expect(err.errors.gender).toBeDefined();
    expect(err.errors.dateOfBirth).toBeDefined();
  });

  it('should expect an error when saving a patient with a pre-saved _id', async () => {
    const duplicatePatient = new Patient({
      _id: savedPatientId,
      name: 'Another Patient',
      password: 'password123',
      nationalId: '09854322',
      gender: 'Male',
      dateOfBirth: new Date('2020-01-01'),
      createdBy: savedAdmin._id
    });

    let err;
    try {
      await duplicatePatient.save();
    } catch (error) {
      err = error;
    }
    expect(err.code).toBe(11000); // mongoose server Duplicate key error code
  });
});
