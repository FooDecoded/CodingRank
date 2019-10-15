import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavBarContainer from './nav/navbar_container';
import Splash from './splash/splash';
import Footer from './footer/footer';
import RubyEditorContainer from './editor/rubyeditor_container';
import JSeditorContainer from './editor/jseditor_container';
import ProfileContainer from './profile/profile_container';
import CompetitionContainer from './competition/competition_index_container';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './app.css';
import CollaborationSpace from './collaboration_space/CollaborationSpace';
// import SharedWhiteBoard from './collaboration_space/SharedWhiteBoard';
// import VideoBar from './collaboration_space/VideoBar';

const App = () => (
    <div className="main-content">
         {/* <NavBarContainer/> */}
            <Switch>
                 <AuthRoute exact path="/" component={Splash} />
                {/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
                {/* <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
                {/* <ProtectedRoute exact path="/profile" component={ProfileContainer}/> */}
                <ProtectedRoute exact path="/editor/JS" component={JSeditorContainer}/>
                <ProtectedRoute exact path="/editor/ruby" component={RubyEditorContainer}/>
                {/* <ProtectedRoute exact path="/competition" component={CompetitionContainer}/>    */}
                <ProtectedRoute exact path="/collab-space" component={CollaborationSpace} />                
                <ProtectedRoute exact path="/collab-space/:id" component={CollaborationSpace} />
            </Switch>
         {/* <Footer/> */}
    </div>
);

export default App;

