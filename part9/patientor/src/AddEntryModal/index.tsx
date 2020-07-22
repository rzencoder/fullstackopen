import React, { useState } from 'react';
import AddEntryForm, {
    EntryFormValues,
} from './AddEntryForm';
import { EntryType } from '../types';
import { Modal, Segment, Dropdown } from 'semantic-ui-react';


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
    }
];

const AddEntryModal = ({ modalOpen, modalClose, onSubmit, error }: Props) => {
    const [entry, setEntry] = useState<string>(EntryType.Hospital);

    const handleChange = (e: React.SyntheticEvent<HTMLElement>, data: any) => {
        setEntry(data.value);
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
                {<AddEntryForm
                    onCancel={modalClose}
                    onSubmit={onSubmit}
                ></AddEntryForm>}
            </Modal.Content>
        </Modal>
    );
};
export default AddEntryModal;