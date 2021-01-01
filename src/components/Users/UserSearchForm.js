import React from "react";
import {Field, Form, Formik} from "formik";

const usersSearchFormValidate = (values) => {
    const errors = {};
    return errors;
}


export const UsersSearchForm = React.memo((props) => {


    const submit = (values, {setSubmitting}) => {

        const filter = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false);
    }


    return <div>
        <Formik
            initialValues={{term: '',friend: 'null'}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (

                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select" >
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>

            )}

        </Formik>
    </div>
})