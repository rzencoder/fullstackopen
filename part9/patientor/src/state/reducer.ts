import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  } | {
    type: 'SET_DIAGNOSIS_LIST';
    payload: Diagnosis[];
  } | {
    type: 'ADD_ENTRY';
    patientId: string;
    payload: Entry;
  } | {
    type: 'SET_PATIENT';
    payload: Patient;
  };

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnoses
  };
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  };
};

export const addEntry = (id: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    patientId: id,
    payload: newEntry
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      const diagnoses = new Map();
      action.payload.forEach((diag) => {
        diagnoses.set(diag.code, diag);
      });
      return {
        ...state,
        diagnoses
      };

    case 'ADD_ENTRY':
      const patient = {
        ...state.patients[action.patientId],
        entries: [...state.patients[action.patientId].entries, action.payload]
      };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: patient
        }
      };

    case 'SET_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    default:
      return state;
  }
};
