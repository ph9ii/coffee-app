import express from 'express';
import podsController from '../controllers/pods.controller';

const router = express.Router();

/* GET all coffee machines. */
router.get('/', podsController.getPods);

export default router;
