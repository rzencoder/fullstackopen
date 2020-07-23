import React from 'react';
import {
    DiagnosisSelection,
    TextField,
    NumberField,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HealthCheckRating, HealthCheckEntry } from '../types';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, 'id'>;

interface Props {
    onCancel: () => void;
    onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const HealthCheckEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: 'HealthCheck',
                description: '',
                date: '',
                healthCheckRating: HealthCheckRating.Healthy,
                diagnosisCodes: [],
                specialist: ''
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = 'Required Field';
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (isNaN(values.healthCheckRating) || values.healthCheckRating > 3) {
                    errors.healthCheckRating = "Enter Numeric Value less than 4";
                }
                if (!values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            name="description"
                            label="Description"
                            placeholder="Description"
                            component={TextField}
                        />
                        <Field
                            name="date"
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            name="healthCheckRating"
                            label="healthCheckRating"
                            component={NumberField}
                            max={3}
                            min={0}
                        />
                        <Field
                            name="specialist"
                            label="Specialist"
                            placeholder="Specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Array.from(diagnoses.values())}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button
                                    type="submit"
                                    color="blue"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default HealthCheckEntryForm;