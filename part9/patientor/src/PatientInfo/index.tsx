import React, { useEffect } from 'react';
import axios from 'axios';
import { Header, Icon, SemanticICONS, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from './EntryDetails';
import { addEntry, useStateValue, setPatient } from '../state';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import './index.css';

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient = patients[id];

    const [openModal, setOpenModal] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModalHandler = (): void => setOpenModal(true);

    const closeModal = (): void => {
        setOpenModal(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (id !== undefined) {
                const { data: newEntry } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries/`,
                    values,
                );
                dispatch(addEntry(id, newEntry));
            }

            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

    const fetchPatient = async (id: string | undefined) => {
        const { data } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`,
        );
        dispatch(setPatient(data));
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
                        <EntryDetails key={entry.id} entry={entry} />
                    ))}
                </>
            )}
            <AddEntryModal
                modalOpen={openModal}
                modalClose={closeModal}
                onSubmit={submitNewEntry}
                error={error}

            />
            <Button color="blue" onClick={() => openModalHandler()}>Add New Entry</Button>
        </div>
    );
};

export default PatientPage;

