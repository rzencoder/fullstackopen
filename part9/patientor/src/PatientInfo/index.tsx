import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';

const PatientPage: React.FC = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | undefined>();

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
                </>
            )}
        </div>
    );
};

export default PatientPage;

