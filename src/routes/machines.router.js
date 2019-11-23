import express from 'express';
import machinesController from '../controllers/machines.controller';

const router = express.Router();

/* GET all coffee machines. */
router.get('/', machinesController.getMachines);

export default router;
