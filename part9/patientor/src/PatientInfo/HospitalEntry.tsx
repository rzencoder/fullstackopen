import React from 'react';
import { HospitalEntry } from '../types';
import { Header, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

type HospitalEntryProps = {
    entry: HospitalEntry;
};

const HospitalEntryComponent: React.FC<HospitalEntryProps> = ({
    entry,
}) => {
    const [{ diagnoses }, ,] = useStateValue();

    return (
        <div className="entry-details">
            <Header as="h3">
                {entry.date}
                <Icon name="hospital"></Icon>
            </Header>
            <p className="entry-description">{entry.description}</p>
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
            <p>discharge date: {entry.discharge.date}</p>
            <p>discharge criteria: {entry.discharge.criteria}</p>
        </div>
    );
};

export default HospitalEntryComponent;