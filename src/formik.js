import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Define your validation schema
const RuleSchema = Yup.object().shape({
    ruleName: Yup.string().required('Required'),
    // Define other fields and nested conditions
});

// Use Formik to manage your form state
<Formik
    initialValues={{ ruleName: '', /* other fields */ }}
    validationSchema={RuleSchema}
    onSubmit={(values) => {
        // Handle form submission
    }}
>
    {({ errors, touched }) => (
        <Form>
            <Field name="ruleName" as={TextField} />
            {/* other fields and condition components */}
            <Button type="submit">Submit</Button>
        </Form>
    )}
</Formik>
