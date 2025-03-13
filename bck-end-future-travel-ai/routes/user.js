import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', UserController.login);
// router.post('/google-login', UserController.googleLogin);

export default router;
