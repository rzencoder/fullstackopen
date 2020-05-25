import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

export default router;