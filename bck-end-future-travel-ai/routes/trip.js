import express from 'express';
import TripController from '../controllers/tripController.js';

const router = express.Router();

router.post('/create-trip', TripController.createTrip);

export default router;
