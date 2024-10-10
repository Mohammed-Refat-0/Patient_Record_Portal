// test suite for hcp model

import mongoose from 'mongoose';
import Hcp from '../backend/models/hcpModel.js';
import Admin from '../backend/models/adminModel.js';
import dotenv from "dotenv";
dotenv.config()

describe('Hcp Model Test', () => {
  let savedAdmin;

  beforeAll(async () => {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);

    const admin = new Admin({
      name: 'Admin2',
      username: 'admin2',
      password: 'password123',
      nationalId: '1245690'
    });
    savedAdmin = await admin.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create & save an Hcp successfully', async () => {
    const hcp = new Hcp({
      name: 'mohammed',
      username: 'mohammed',
      password: 'password123',
      nationalId: '1234567890',
      title: 'Doctor',
      createdBy: savedAdmin._id
    });
    const savedHcp = await hcp.save();

    expect(savedHcp.name).toEqual('mohammed');
    expect(savedHcp).toBeInstanceOf(Hcp);
    expect(savedHcp._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });

  it('should fail to create a hcp without required fields', async () => {
    const hcp2 = new Hcp({ username: 'Name' });
    let err;
    try {
      await hcp2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    expect(err.errors.nationalId).toBeDefined();
    expect(err.errors.title).toBeDefined();
  });

  it('should expect an error when saving an Hcp with a pre-saved username', async () => {
    const hcp = new Hcp({
      name: 'a',
      username: 'mohammed',
      password: 'password123',
      nationalId: '0987541',
      title: 'Doctor',
      createdBy: savedAdmin._id
    });

    let err;
    try {
      await hcp.save();
    } catch (error) {
      err = error;
    }
    expect(err.code).toBe(11000); // mongoose server Duplicate key error code
  });
});
