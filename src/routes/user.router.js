import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createUser, getUsers, loginUser, userProfile, updatePassword, updateUserProfile } from "../controllers/user.controller.js";
import { createUserBodyValidator, loginSchemaValidator, updatePasswordValidator, updateUserProfileValidator } from "../validators/user.dto.js";

const router = express.Router();

// Routes
router.get('/', authMiddleware, getUsers);
router.post('/login', validate(loginSchemaValidator), loginUser);
router.post('/', validate(createUserBodyValidator), createUser);
router.get('/profile', authMiddleware, userProfile);
router.patch('/password', authMiddleware, validate(updatePasswordValidator), updatePassword);
router.patch('/profile', authMiddleware, validate(updateUserProfileValidator), updateUserProfile);

export { router as userRouter };
 