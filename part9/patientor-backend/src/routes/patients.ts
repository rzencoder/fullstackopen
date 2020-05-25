import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, ssn, dateOfBirth, occupation, gender } = req.body;
    const newPatientEntry = patientService.addPatient({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender
    });
    res.json(newPatientEntry);
});

export default router;