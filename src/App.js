import React, { Component } from 'react';
import { withSuspense } from './hoc/withSuspense';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Music from './components/Music/Music';
import Setting from './components/Setting/Setting';
import { Route } from "react-router-dom";
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux"
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/LoginPage';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/preloader/Preloader';
import Trenirovka from './components/Trenirovka/Trenirovka';
import NewsPage from './components/Trenirovka/News/NewsPage';
import UsersTContainer from './components/Trenirovka/UsersTrenirivka/UsersTContainer';
import ProfileTrContainer from './components/Trenirovka/Profile/ProfileTrContainer';
import UserPageContainer from './components/Trenirovka/TrenirovkaPage/UserPageContainer';
//import DialogContainer from './components/Dialog/DialogContainer';
const DialogContainer = React.lazy(() => import('./components/Dialog/DialogContainer'));



class App extends Component {


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
        <div className='app-wrapper-content'>

          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          {/*<Route path='/dialog' render={() => <DialogContainer />} />*/}
          <Route path='/dialog' render={withSuspense(DialogContainer)}/>
          <Route path='/news' render={() => <NewsPage />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/setting' render={() => <Setting />} />
          <Route path='/users' render={() => <UsersContainer />} />

          <Route path='/login' render={() => <LoginPage />} />

          <Route path='/trenirovka' render={() => <Trenirovka />} />
          <Route path='/userstrenitovka' render={() => <UsersTContainer />} />
          <Route path='/profiletrenirovka/:userId?' render={() => <ProfileTrContainer />} />
          <Route path='/userpage' render={() => <UserPageContainer />} />



        </div>
      </div>

    )
  }

}

const mapStateToProps = (state) => ({
  isInitialised: state.app.isInitialised
})


let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))
  (App)

let MainApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MainApp
