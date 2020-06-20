import React from 'react';
import { Icon, Header, SemanticCOLORS } from 'semantic-ui-react';
import { HealthCheckEntry, HealthCheckRating } from '../types';

const assertNever = (value: never): never => {
    throw new Error('Unexpected object: ' + value);
};

type HealthCheckEntryProps = {
    entry: HealthCheckEntry;
};

const HealthCheckEntryComponent: React.FC<HealthCheckEntryProps> = ({
    entry,
}) => {
    let color: SemanticCOLORS = 'green';
    switch (entry.healthCheckRating) {
        case HealthCheckRating.Healthy:
            color = 'green';
            break;
        case HealthCheckRating.LowRisk:
            color = 'yellow';
            break;
        case HealthCheckRating.HighRisk:
            color = 'orange';
            break;
        case HealthCheckRating.CriticalRisk:
            color = 'red';
            break;
        default:
            return assertNever(entry.healthCheckRating);
    }

    return (
        <div className="entry-details">
            <Header as="h3">
                {entry.date}
                <Icon name="doctor"></Icon>
            </Header>
            <p className="entry-description">{entry.description}</p>
            <Icon name="heart" color={color}></Icon>
        </div>
    );
};

export default HealthCheckEntryComponent;