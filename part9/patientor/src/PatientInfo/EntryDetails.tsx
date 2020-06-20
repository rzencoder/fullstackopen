import React from 'react';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import { Entry } from '../types';

type EntryDetailsProps = {
    entry: Entry;
};

const assertNever = (x: never): never => {
    throw new Error('Unexpected object: ' + x);
};

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;