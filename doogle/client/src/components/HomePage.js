import PersonalizedNavbar from "./PersonalizedNavbar";
import logoIcon from '../myicons/logo.png'
import dog1 from '../myicons/1.png';
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Jumbotron, Container } from 'react-bootstrap';
import uparrow from '../myicons/up-arrow.png';
import bookmark from '../myicons/bookmark.png';
import newpost from '../myicons/messaging.png';
import expert from '../myicons/veterinary.png';
import esse from '../myicons/esse.png';
import { Route, Switch, Redirect } from 'react-router-dom';
import API from "../API";
import ModalHelp from "./ModalHelp";

function HomePage(props) {
  const [redNew, setRedNew] = useState(false);
  const [redUps, setRedUps] = useState(false);
  const [redExp, setRedExp] = useState(false);
  const [redGui, setRedGui] = useState(false);
  const [tags, setTags] = useState([]);
  const [dirty, setDirty] = useState(true);
  const [redSaved, setRedSaved] = useState(false);
  const [firstTime, setFT] = useState(props.userInfo.nlog === 0 ? true : false)
  const [use, setUse] = useState(props.userInfo.nlog === 0 ? 1 : 2)

  function setmd(e) {
    if (e === 1) {
      API.logUser(props.userInfo.id).then(r => {
        console.log(r)
        props.setUserDirty(true)
        setUse(2)
      })
      setFT(false)
    } else { setFT(false) }
  }

  useEffect(() => {
    const getTags = () => {
      if (dirty) {
        API.getAllTags()
          .then(t => setTags(t))
          .catch(() => setTags([]))
          .finally(() => { setDirty(false); })
      }
    }
    getTags();

  }, [dirty])

  {/*
  useEffect(() => {
    if (playing) {
      audio.play();
    }
  },
    [playing]
  );

  
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);*/}

  return (<Container fluid className='mainpage'>
    <img
      alt=""
      src={logoIcon}
      width="290"
      height="130"
      className="mx-auto d-block"
    />
    {/*!clicked ?*/ <Container fluid>
      <div>
        <img
          alt=""
          src={dog1}
          width="150"
          height="150"
          className="mx-auto d-block mb-3"
          onClick={() => { setFT(true) }}
        />
        <p className="texthome">Need help? Tap me!</p>
      </div>
    </Container>
    /*:
      <>
        <div>
          <img
            alt=""
            src={dog2}
            width="150"
            height="150"
            className="mx-auto d-block mb-2"
          /><p className="texthome2" style={{ left: (124 + 5 * (4 - props.userInfo.name.length)) }}>Woofcome {props.userInfo.name}!</p>
        </div>
      </>
    */}
    <Card className="shortcuts">
      <ListGroup>
        <ListGroup.Item className='paddingshorts' onClick={() => setRedGui(true)}>
          <h5><img
            alt=""
            src={esse}
            width="30"
            height="30"
            className="mr-2"
          />Essentials guide articles</h5>
          <p className="limarginbottom">
            First time dog owner? Read our selection of articles!
          </p>
        </ListGroup.Item>
        <ListGroup.Item className='paddingshorts' onClick={() => setRedNew(true)}>
          <h5><img
            alt=""
            src={newpost}
            width="30"
            height="30"
            className="mr-2"
          />New post</h5>
          <p className="limarginbottom">
            Write a new post on the forum!
          </p>
        </ListGroup.Item>
        <ListGroup.Item className='paddingshorts' onClick={() => setRedExp(true)}>
          <h5><img
            alt=""
            src={expert}
            width="30"
            height="30"
            className="mr-2"
          />Experts' posts</h5>
          <p className="limarginbottom">
            See what experts are saying!
          </p>
        </ListGroup.Item>
        <ListGroup.Item className='paddingshorts' onClick={() => setRedUps(true)}>
          <h5><img
            alt=""
            src={uparrow}
            width="30"
            height="30"
            className="mr-2"
          />Most upped posts</h5>
          <p className="limarginbottom">
            See the posts that experts appreciate the most!
          </p>
        </ListGroup.Item>
        <ListGroup.Item className='paddingshorts' onClick={() => setRedSaved(true)}>
          <h5><img
            alt=""
            src={bookmark}
            width="30"
            height="30"
            className="mr-2"
          />Favorite posts</h5>
          <p className="limarginbottom">
            Check the interesting posts that you've saved!
          </p>
        </ListGroup.Item>
      </ListGroup>
    </Card>
    {firstTime && <ModalHelp md={firstTime} setmd={setmd} use={use} userInfo={props.userInfo} />}
    {redExp && <Redirect to={{ pathname: '/forum', state: { subcategory: tags.filter(t => t.tag === "Expert") } }}></Redirect>}
    {redGui && <Redirect to={{ pathname: '/guide', state: { esse: true } }}></Redirect>}
    {redNew && <Redirect to={{ pathname: '/forum', state: { newPost: true } }}></Redirect>}
    {redUps && <Redirect to={{ pathname: '/forum', state: { sort: "decups" } }}></Redirect>}
    {redSaved && <Redirect to={{ pathname: '/profile', state: { favorite: true } }}></Redirect>}
    <PersonalizedNavbar setGoToHome={props.setGoToHome} setGoToProfile={props.setGoToProfile} setGoToGuide={props.setGoToGuide} setGoToForum={props.setGoToForum} currentPage={"home"} />
  </Container>)
}

export default HomePage;