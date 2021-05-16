import React from 'react';
import { withSuspense } from './hoc/withSuspense';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import { HashRouter, Route } from "react-router-dom";
import store, { AppStateType } from './redux/redux-store';
import { Provider } from "react-redux"
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/preloader/Preloader';
import FooterContainer from './components/Footer/FooterContainer';
import FriendPageContainer from './components/FreindPage/FriendPageContainer';
import UsersPage from './components/Users/UsersContainer';

//import DialogContainer from './components/Dialog/DialogContainer';
const DialogContainer = React.lazy(() => import('./components/Dialog/DialogContainer'));

type MapStateToPropsType={
  isInitialised: boolean
}
type MapDispatchToPropsType={
  initializeApp:()=>void
}
type OwnPropsType={

}
type PropsType=MapStateToPropsType & MapDispatchToPropsType& OwnPropsType

const SuspenseDialog=withSuspense(DialogContainer)

class App extends React.Component<PropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.isInitialised) {
      return <Preloader />
    }
     
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <FooterContainer />
        <div className='app-wrapper-content'>
          <Route exact path='/' render={() => <Redirect to={"/profile"} />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          {/*<Route path='/dialog' render={() => <DialogContainer />} />*/}
          <Route path='/dialog' render={()=><SuspenseDialog/>} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/setting' render={() => <Setting />} />
          <Route path='/users' render={() => <UsersPage />} />
          <Route path='/login' render={() => <LoginPage />} />
          {/*<Route path='*' render={() => (<div>404 NOT FOUND</div>)} />*/}
          <Route path='/friendpage' render={() => <FriendPageContainer />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state:AppStateType) => ({
  isInitialised: state.app.isInitialised
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, { initializeApp }))
  (App)

let MainApp:React.FC = () => {
  return <HashRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default MainApp
