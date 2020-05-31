import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import toNewDiaryEntry from '../utils';

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(patientService.getPatient(id));
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewDiaryEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});

export default router;