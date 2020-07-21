import {
    Patient, NonSensitivePatientEntry, NewPatientEntry, PublicPatient,
    Entry,
} from './../types';
import patients from '../data/patients';
import { checkEntry } from "../utils";

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

const addEntry = (patientId: string, entry: NewPatientEntry) => {
    checkEntry(entry);
    const myEntry = {
        id: Math.floor(Math.random() * 10000).toString(),
        ...entry,
    };
    const patient = patients.find((p) => p.id == patientId);
    if (patient === undefined) throw new Error("Patient not found");
    patient.entries.push(myEntry);
    console.log(patient.entries)
    return myEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatient,
    addEntry
};