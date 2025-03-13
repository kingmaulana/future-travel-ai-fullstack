import express from 'express';
import userRoute from './user.js';
import tripRoute from './trip.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/trip', tripRoute);

export default router;
