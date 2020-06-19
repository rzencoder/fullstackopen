import { Patient, NonSensitivePatientEntry, NewPatientEntry, PublicPatient } from './../types';
import patients from '../data/patients';

const getEntries = (): Array<Patient> => { return patients; };

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatientEntry = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const getPatient = (id: string): PublicPatient | undefined => {
    return patients.find((patient: Patient) => patient.id === id);
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatient
};