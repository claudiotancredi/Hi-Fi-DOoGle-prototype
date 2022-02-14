//import bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
//import my CSS
import './mycss/custom.css';
//import react-bootstrap components
import { Container } from 'react-bootstrap/';
//imports needed to use state
import React, { useState, useEffect } from 'react';
import API from "./API";

import HomePage from './components/HomePage';
import GuidePage from './components/GuidePage';
import ProfilePage from './components/ProfilePage';
import ForumPage from './components/ForumPage';


import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';



function App() {

  const [goToHome, setGoToHome] = useState(false);
  const [goToProfile, setGoToProfile] = useState(false);
  const [goToGuide, setGoToGuide] = useState(false);
  const [goToForum, setGoToForum] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  const [dirtUser, setUserDirty] = useState(false)

  useEffect(() => {
    const getUserInfo = () => {
      API.getUserInfo(3)
        .then(uinfo => setUserInfo(uinfo))
        .catch(() => setUserInfo(undefined))
      setUserDirty(false)
    }
    getUserInfo();
  }, [dirtUser]);

  function setGoToHomeDebug(v) {
    console.log("Done")
    setGoToHome(v)
  }

  return (<>

    <Router>
      {goToHome && <Redirect to="/" />}
      {goToProfile && <Redirect to="/profile" />}
      {goToGuide && <Redirect to="/guide" />}
      {goToForum && <Redirect to="/forum" />}
      {userInfo &&
        <Main
          userInfo={userInfo}
          setUserDirty={setUserDirty}
          setGoToHome={setGoToHomeDebug}
          setGoToProfile={setGoToProfile}
          setGoToGuide={setGoToGuide}
          setGoToForum={setGoToForum} />
      }
    </Router>

  </>
  );
}

function Main(props) {
  return (
    <Container fluid>
      <Switch>

        <Route exact path="/profile" render={({ location }) =>
          <ProfilePage
            state={location.state}
            userInfo={props.userInfo}
            setGoToHome={props.setGoToHome}
            setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide}
            setGoToForum={props.setGoToForum} />
        } />

        <Route exact path="/guide" render={({ location }) =>
          <GuidePage
            state={location.state}
            setGoToHome={props.setGoToHome}
            setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide}
            setGoToForum={props.setGoToForum} />
        } />

        <Route exact path="/forum" render={({ location }) =>
          <ForumPage
            state={location.state}
            userInfo={props.userInfo}
            setGoToHome={props.setGoToHome}
            setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide}
            setGoToForum={props.setGoToForum} />
        } />

        <Route exact path="/" render={() =>
          <HomePage
            userInfo={props.userInfo}
            setGoToHome={props.setGoToHome}
            setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide}
            setGoToForum={props.setGoToForum}
            setUserDirty={props.setUserDirty} />
        } />

        <Route render={() =>
          <Redirect to="/" />
        } />

      </Switch>
    </Container>
  )
}

export default App;