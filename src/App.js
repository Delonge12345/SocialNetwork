import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import {MenuBurger} from "./components/MenuBurger/MenuBurger";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import Footer from "./components/Footer/Footer";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersPage, {UsersContainer} from "./components/Users/UsersContainer";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {LoginContainer} from "./components/Login/LoginContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializedThunkCreator} from "./redux/appReducer";
import Preloader from "./components/Preloader/Preloader";
import store from "./redux/redux-store";


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends React.Component {

    componentDidMount() {

        this.props.initializedAppThunk()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        } else


            return (
                <div className="app">
                    <MenuBurger/>
                    <div className='content'>
                        <LoginContainer/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <Suspense fallback={<Preloader/>}><DialogsContainer/></Suspense>  }/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={() => <UsersPage/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                    </div>
                    <Footer/>
                </div>
            );

    }
}


const mapStateToProps = (state) => {
    return {
        initialized: state.appInitial.initialized
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // getAuthMeThunk: (id, email, login) => {
        //     dispatch(getAuthMeThunkCreator(id, email, login))
        // },
        initializedAppThunk: () => {
            dispatch(initializedThunkCreator())
        }
    }
}



const AppContainer = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(App);
const SamuraiJsApp =  (props) => {
   return  <Router>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </Router>
}

export default SamuraiJsApp;





