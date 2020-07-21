import { Patient, Gender } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (string: any, name: string): string => {
    if (!string || !isString(string)) {
        throw new Error(`Incorrect or missing ${name}: ${string}`);
    }
    return string;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name`);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect of missing gender');
    }
    return gender;
};

export const toNewPatientEntry = (object: any): Patient => {
    const newEntry: Patient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender)
    };

    return newEntry;
};

export const checkEntry = (object: any) => {
    parseDate(object.date);
    parseString(object.description, "description");
    parseString(object.specialist, "specialist");

    switch (object.type) {
        case "Hospital":
            if (object.discharge === undefined) throw new Error("Discharge missing");
            parseDate(object.discharge.date);
            parseString(object.discharge.criteria, "criteria");
            break;
        case "OccupationalHealthcare":
            parseString(object.employerName, "employer name");
            if (object.sickLeave) {
                parseDate(object.sickLeave.startDate);
                parseDate(object.sickLeave.endDate);
            }
            break;
        case "HealthCheckEntry":
            if (
                isNaN(object.healthCheckRating) ||
                object.healthCheckRating < 0 ||
                object.healthCheckRating > 3
            )
                throw new Error(
                    "Missing health rating " + object.healthCheckRating
                );
            break;
        default:
            throw new Error("Unknown type " + object.type);
    }
};