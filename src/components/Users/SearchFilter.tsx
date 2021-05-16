import React from 'react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { selectorFriend, selectorTerm } from '../../redux/usersSelector';


type PropsType = {
    searchUsers: (term: string, friend: null | boolean) => void

}
type ValuesFormType = {
    term: string
    friend: null | boolean
}
type ValuesType = {
    term: string
    friend: 'null' | 'true' | 'false'
}

const SearchFilter: React.FC<PropsType> = React.memo((props) => {

    const term = useSelector(selectorTerm)
    const friend = useSelector(selectorFriend)

    let searchUsers = (values: ValuesType, { setSubmitting }: FormikHelpers<ValuesType>) => {
        const filter: ValuesFormType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        props.searchUsers(filter.term, filter.friend)
        setSubmitting(false);
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: term, friend: String(friend) as 'null' | 'true' | 'false' }}
                onSubmit={searchUsers}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only friend</option>
                            <option value="false">Not friend</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Search
           </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})

export default SearchFilter