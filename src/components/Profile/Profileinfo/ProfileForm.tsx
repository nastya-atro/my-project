import React from 'react';
import StatusHook from './StatusHook';
import s from './ProfileForm.module.css'
import { ContactsType, ProfileType } from '../../../types/types';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },
    indicator: {
        backgroundColor: '#036451a1',
    },
    text: {
        color: '#036451a1'
    }
}));
type PropsTypes = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    changeEditMode: () => void

}

const ProfileForm: React.FC<PropsTypes> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div>
            <Paper className={s.form_block_name_status}>
                {props.isOwner &&
                    <button className={s.button_edit} onClick={props.changeEditMode}>Edit profile</button>
                }
                <div className={s.fullName}>{props.profile.fullName}</div>
                <div className={s.status}>
                    <StatusHook status={props.status} updateStatus={props.updateStatus} />
                </div>
            </Paper>
            <Paper className={s.form_block_job_contacts}>
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs centered
                            value={value}
                            onChange={handleChange}
                            classes={{
                                indicator: classes.indicator
                            }}
                            className={classes.text}
                        >
                            <Tab label="About me" {...a11yProps(0)} />
                            <Tab label="My job"  {...a11yProps(1)} />
                            <Tab label="My contacts"  {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <div className={s.aboutMe}>
                            <h3>About me:</h3>
                            {props.profile.aboutMe || '--'}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className={s.job}>
                            <h3>Info for my job:</h3>
                            <div> <b>Searching a job:</b>{props.profile.lookingForAJob ? "yes" : "no"}</div>
                            <div><b>Professional skils:</b>{props.profile.lookingForAJobDescription}</div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className={s.contacts}><h3>My contacts:</h3>
                            {Object.keys(props.profile.contacts as ContactsType).map(key => {
                                return <Contact key={key} contactTitle={key}
                                    contactValue={!props.profile.contacts ? '-' : props.profile.contacts[key as keyof ContactsType]} />
                            })}
                        </div>
                    </TabPanel>
                </div></Paper>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return <div><b>{contactTitle}</b> {contactValue || "-"} </div>
}


export default ProfileForm