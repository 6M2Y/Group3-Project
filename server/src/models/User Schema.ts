/* eslint-disable @typescript-eslint/no-unused-vars */
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   createdAt: { type: Date, default: Date.now }
// });

// // Hash password before saving the user
// userSchema.pre('save', async function (next) {
//   const user = this;

//   // Only hash the password if it has been modified or is new
//   if (!user.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);        // Generate a salt
//     user.password = await bcrypt.hash(user.password, salt); // Hash the password with the salt
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Compare passwords for login
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };
// const User = mongoose.model('User', UserSchema);
// module.exports = User;
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface for User model to define types
export interface IUser extends Document {
  fullname: string;
  password: string;
  email: string;
  username: string,
  google_auth: boolean,
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// User schema definition
 const UserSchema: Schema<IUser> = new Schema(
  {
    fullname: { type: String, required: true },
    password: { type: String, required: function() { return !this.google_auth; } },
    email: { type: String, required: true, unique: true,  lowercase: true },
     username: { type: String, unique: true },
    google_auth: {type:Boolean, default:false}
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` fields automatically
);
// Hash password before saving the user
UserSchema.pre('save', async function (this: IUser, next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) return next();  // Skip hashing if password isn't modified

  try {
    const salt = await bcrypt.genSalt(10);  // Generate a salt
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password with the salt
    next();  // Proceed to save the document
  } catch (error) {
    // Directly throw error if there's an issue
    throw new Error('Error hashing password');
  }
});

// Compare passwords for login
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;