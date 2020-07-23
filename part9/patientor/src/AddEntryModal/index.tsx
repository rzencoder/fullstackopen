import React, { useState } from 'react';
import HospitalEntryForm, {
    HospitalEntryFormValues,
} from './HospitalEntryForm';
import HealthCheckEntryForm, {
    HealthCheckEntryFormValues,
} from './HealthCheckEntryForm';
import { EntryType } from '../types';
import { Modal, Segment, Dropdown } from 'semantic-ui-react';


export type EntryFormValues =
    HospitalEntryFormValues
    | HealthCheckEntryFormValues;

interface Props {
    modalOpen: boolean;
    modalClose: () => void;
    onSubmit: (values: EntryFormValues) => void;
    error?: string;
}

export type EntryOption = {
    key: number;
    text: EntryType;
    value: EntryType;
};

const entryOptions: EntryOption[] = [
    {
        key: 0,
        text: EntryType.Hospital,
        value: EntryType.Hospital,
    },
    {
        key: 1,
        text: EntryType.HealthCheck,
        value: EntryType.HealthCheck,
    },

];

const AddEntryModal = ({ modalOpen, modalClose, onSubmit, error }: Props) => {
    const [entry, setEntry] = useState<string>(EntryType.Hospital);

    const handleChange = (e: React.SyntheticEvent<HTMLElement>, data: any) => {
        setEntry(data.value);
    };

    const selectForm = () => {
        if (entry === EntryType.Hospital) {
            return (
                <HospitalEntryForm
                    onCancel={modalClose}
                    onSubmit={onSubmit}
                ></HospitalEntryForm>
            );
        }
        if (entry === EntryType.HealthCheck) {
            return (
                <HealthCheckEntryForm
                    onCancel={modalClose}
                    onSubmit={onSubmit}
                ></HealthCheckEntryForm>
            );
        }
    };

    return (
        <Modal open={modalOpen} onClose={modalClose} centered={false} closeIcon>
            <Modal.Header>
                New entry
            <Dropdown
                    value={entry}
                    options={entryOptions}
                    selection
                    onChange={handleChange}
                ></Dropdown>
            </Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                {selectForm()}
            </Modal.Content>
        </Modal>
    );
};
export default AddEntryModal;