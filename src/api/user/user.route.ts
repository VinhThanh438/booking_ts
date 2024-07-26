import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.logIn);

export default router;
