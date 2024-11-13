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
    throw new Error('Error hashing password' + error);
  }
});

// Compare passwords for login
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;