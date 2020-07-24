import React from 'react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthCareEntry } from '../types';
import { Field, Formik, Form } from 'formik';
import { Grid, Button } from 'semantic-ui-react';

export type OccupationalEntryFormValues = Omit<OccupationalHealthCareEntry, 'id'>;

interface Props {
    onSubmit: (values: OccupationalEntryFormValues) => void;
    onCancel: () => void;
}

const OccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: 'OccupationalHealthcare',
                description: '',
                date: '',
                employerName: '',
                sickLeave: {
                    startDate: '',
                    endDate: '',
                },
                diagnosisCodes: [],
                specialist: '',
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const errors: { [field: string]: string } = {};
                const requiredError = 'Required Field';
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                if (!values.sickLeave.startDate) {
                    errors.sickLeave = requiredError;
                }
                if (!values.sickLeave.endDate) {
                    errors.sickLeave = requiredError;
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
                            name="employerName"
                            label="Employer Name"
                            placeholder="employer name"
                            component={TextField}
                        />
                        <Field
                            name="specialist"
                            label="Specialist"
                            placeholder="Specialist"
                            component={TextField}
                        />
                        <Field
                            name="sickLeave.startDate"
                            label="Sick Leave Start"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            name="sickLeave.endDate"
                            label="Sick Leave End"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
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

export default OccupationalEntryForm;