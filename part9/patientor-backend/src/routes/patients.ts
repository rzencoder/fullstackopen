import express from 'express';
const router = express.Router();
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(patientService.getPatient(id));
});

router.post('/', (req, res) => {
    try {
        console.log(req.body);
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log('error');
        res.status(400).send(e.message);
    }
});

router.post("/:id/entries", (req, res) => {
    console.log('ok');
    try {
        res.send(patientService.addEntry(req.params.id, req.body));
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

export default router;