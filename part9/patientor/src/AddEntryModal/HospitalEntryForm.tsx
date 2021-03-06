import React from 'react';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { HospitalEntry, Discharge } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';


export type HospitalEntryFormValues = Omit<HospitalEntry, 'id'>;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: 'Hospital',
                date: '',
                description: '',
                specialist: '',
                discharge: {
                    date: '',
                    criteria: '',
                },
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const errors: { [field: string]: string | Discharge } = {};
                const requiredError = 'Required Field';
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.discharge.date) {
                    errors.discharge = {
                        criteria: '',
                        date: requiredError,
                    };
                }
                if (!values.discharge.criteria) {
                    errors.discharge = {
                        date: '',
                        criteria: requiredError,
                    };
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
                            name="discharge.date"
                            label="Discharge date"
                            placeholder="YYYY-MM-DD"
                            component={TextField}
                        />
                        <Field
                            name="discharge.criteria"
                            label="Discharge criteria"
                            placeholder="Discharge criteria"
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

export default HospitalEntryForm;