import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

/**
 * @param {Object} req 
 * @param {Object} res
 * @param {Function} next
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    const data = jsonwebtoken.verify(token, process.env.SECRET_TOKEN);

    if (!data || !data._id) {
      throw new Error('Invalid token');
    }

    const user = await UserModel.findOne({ _id: data._id, isActive: true });

    if (!user) {
      throw new Error('User not found or inactive');
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export { authMiddleware };
