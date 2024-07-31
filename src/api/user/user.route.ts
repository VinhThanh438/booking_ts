import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post('/register', UserController.register);

router.post('/login', UserController.logIn);

router.get('/logout', UserController.logOut);

export default router;
