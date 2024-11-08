const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);        // Generate a salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password with the salt
    next();
  } catch (error) {
    next(error);
  }
});

// Compare passwords for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', UserSchema);
module.exports = User;
