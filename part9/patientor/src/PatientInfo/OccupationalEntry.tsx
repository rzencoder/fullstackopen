import React from 'react';
import { OccupationalHealthCareEntry } from '../types';
import { Header, Icon } from 'semantic-ui-react';

type OccupationalEntryProps = {
    entry: OccupationalHealthCareEntry;
};
const OccupationalEntryComponent: React.FC<OccupationalEntryProps> = ({
    entry,
}) => {
    return (
        <div className="entry-details">
            <Header as="h3">
                {entry.date}
                <Icon name="stethoscope"></Icon>
                {entry.employerName}
            </Header>
            <p className="entry-description">{entry.description}</p>
        </div>
    );
};

export default OccupationalEntryComponent;