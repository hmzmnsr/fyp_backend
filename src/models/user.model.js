import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import { bcryptCompare, bcryptHash } from "../common/encryption.common.js";
import { UserSchemaValidator } from "../validators/user.dto.js";
import { userSchema } from "../schemas/users.schema.js";

// Validate schema before saving
userSchema.pre('validate', async function (next) {
  try {
    await UserSchemaValidator.validateAsync(this.toObject());
    next();
  } catch (error) {
    next(error);
  }
});

// Hash password before saving if it has been modified
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcryptHash(this.password);
      this.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcryptCompare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Method to generate JWT token
userSchema.methods.generateToken = function () {
  if (!process.env.SECRET_TOKEN) {
    throw new Error('SECRET_TOKEN is not defined');
  }

  return jsonwebtoken.sign({ _id: this._id }, process.env.SECRET_TOKEN, {
    expiresIn: '30d',
  });
};

// Method to update password
userSchema.methods.updatePassword = async function (newPassword) {
  try {
    const hashedPassword = await bcryptHash(newPassword);
    this.password = hashedPassword;
    await this.save();
  } catch (error) {
    throw new Error('Error updating password');
  }
};

// Create and export the UserModel
const UserModel = mongoose.model('Users', userSchema);

export { UserModel };
