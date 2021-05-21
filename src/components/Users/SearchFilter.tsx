import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useSelector } from 'react-redux';
import { selectorFriend, selectorTerm } from '../../redux/usersSelector';
import { InputBase, makeStyles, createStyles, Theme, fade, NativeSelect, Button, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        container: {
            align: 'center'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        button: {
            marginLeft: 20
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        }
    }),
);

const SearchFilter: React.FC<PropsType> = React.memo((props) => {
    const classes = useStyles();

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


    return (<>
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: term, friend: String(friend) as 'null' | 'true' | 'false' }}
                onSubmit={searchUsers}
            >
                {({ isSubmitting, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>

                            <InputBase
                                onChange={handleChange}
                                type="text"
                                name="term"
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <Container className={classes.container}>
                            <NativeSelect name="friend" className={classes.selectEmpty} onChange={handleChange}>
                                <option value="null">All Users</option>
                                <option value="true">Only friend</option>
                                <option value="false">Not friend</option>
                            </NativeSelect>

                            <Button className={classes.button} variant="contained" type="submit" disabled={isSubmitting}>
                                Search
           </Button>
                        </Container>
                    </Form>
                )}
            </Formik>
        </div>
    </>
    )
})

export default SearchFilter