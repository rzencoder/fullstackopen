import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientPage: React.FC = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | undefined>();
    const [{ diagnoses }, ,] = useStateValue();

    const fetchPatient = async (id: string | undefined) => {
        const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`,
        );
        setPatient(data);
    };

    useEffect(() => {
        fetchPatient(id);
    }, [id]);

    const setIcon = (): SemanticICONS => {
        if (patient) {
            const { gender } = patient;
            if (gender === 'male') {
                return 'mars';
            }
            else if (gender === 'female') {
                return 'venus';
            }
        }
        return 'mercury';
    };


    return (
        <div>
            {patient && (
                <>
                    <Header>
                        {patient.name} <Icon name={setIcon()}></Icon>
                    </Header>
                    <p>SSN: {patient.ssn}</p>
                    <p>Occupation: {patient.occupation}</p>
                    <h3>Entries</h3>
                    {patient.entries.map((entry: Entry) => (
                        <p key={entry.id}>{entry.description}
                            <ul>
                                {entry.diagnosisCodes
                                    ? entry.diagnosisCodes.map((code) => {
                                        const diagnosis = diagnoses.get(code);
                                        return (
                                            <li key={code}>
                                                {code} {diagnosis?.name}
                                            </li>
                                        );
                                    })
                                    : null}
                            </ul>
                        </p>
                    ))}
                </>
            )}
        </div>
    );
};

export default PatientPage;

