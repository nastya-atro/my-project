import React, { useEffect } from 'react';
import { withSuspense } from './hoc/withSuspense';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import { HashRouter, Route } from "react-router-dom";
import store, { AppStateType } from './redux/redux-store';
import { Provider, useDispatch } from "react-redux"
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/LoginPage';
import { useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/preloader/Preloader';
import FooterContainer from './components/Footer/FooterContainer';
import FriendPageContainer from './components/FreindPage/FriendPageContainer';
import UsersPage from './components/Users/UsersContainer';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { AppBar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const DialogContainer = React.lazy(() => import('./components/Dialog/DialogContainer'));
const ChatPage = React.lazy(() => import('./webSocket_pages/chat/ChatPages'))

const SuspenseDialog = withSuspense(DialogContainer)
const SuspenseChatPages = withSuspense(ChatPage)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1

  },
  mainContent:{
    marginTop: theme.spacing(13)
  }


})
)


const App: React.FC = () => {
  const classes = useStyles();

  const isInitialised = useSelector((state: AppStateType) => state.app.isInitialised)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeApp())
  }, [])





  if (!isInitialised) {
    return <Preloader />
  }

  return (

    <>
      <AppBar position="fixed"  >
        <HeaderContainer />
      </AppBar>
      
      <Paper className={classes.mainContent}>
        <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Navbar />
          </Grid>

          <Grid item xs={10}>
            <Route exact path='/' render={() => <Redirect to={"/profile"} />} />
            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
            {/*<Route path='/dialog' render={() => <DialogContainer />} />*/}
            <Route path='/dialog' render={() => <SuspenseDialog />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/setting' render={() => <Setting />} />
            <Route path='/users' render={() => <UsersPage />} />
            <Route path='/login' render={() => <LoginPage />} />
            {/*<Route path='*' render={() => (<div>404 NOT FOUND</div>)} />*/}
            <Route path='/friendpage' render={() => <FriendPageContainer />} />
            <Route path='/chat' render={() => <SuspenseChatPages />} />
          </Grid>

          <Grid item xs={12}>
            <FooterContainer />
          </Grid>

        </Grid>
        </Container>
      </Paper>





    </>







  )
}





let AppC = withRouter(App)

const AppContainer = () => {
  return (
    <AppC />
  )
}


let MainApp: React.FC = () => {
  return <HashRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default MainApp
