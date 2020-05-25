import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from './../types';
import patients from '../data/patients';

const getEntries = (): Array<PatientEntry> => { return patients; };

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
};