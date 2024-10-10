// test suite for admin model

import mongoose from 'mongoose';
import Admin from '../backend/models/adminModel.js';
import dotenv from "dotenv";
dotenv.config()


describe('Admin Model Test', () => {
  beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save an admin successfully', async () => {
    const adminData = {
      name: 'Admin Name',
      username: 'Admin Name',
      password: 'password123',
      nationalId: '1234567890'
    };
    const validAdmin = new Admin(adminData);
    const savedAdmin = await validAdmin.save();

    expect(savedAdmin._id).toBeDefined();
    expect(savedAdmin.name).toBe(adminData.name);
    expect(savedAdmin.password).toBe(adminData.password);
    expect(savedAdmin.nationalId).toBe(adminData.nationalId);
  });

  it('should fail to create an admin without required fields', async () => {
    const adminWithoutRequiredField = new Admin({ username: 'Adminn' });
    let err;
    try {
      await adminWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    expect(err.errors.nationalId).toBeDefined();
  });

  it('should expect an error when saving an admin with a pre-saved nationalId', async () => {
    const duplicateadmin = new Admin({
      name: 'Admin',
      username: 'Admmmin',
      password: 'password123',
      nationalId: '1234567890'
    });

    let err;
    try {
      await duplicateadmin.save();
    } catch (error) {
      err = error;
    }
    expect(err.code).toBe(11000); // mongoose server Duplicate key error code
  });
});
