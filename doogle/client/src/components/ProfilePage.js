//imports needed to use state
import { Container, Row, Button, Badge } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import MyPosts from "./MyPosts";
import FavoritePostsCopy from "./FavoritePostscopy";
import HelpPage from "./HelpPage";
import PersonalizedNavbar from "./PersonalizedNavbar";
import ProfileHeader from "./ProfileHeader";

function ProfilePage(props) {

    const [favorites, setFavorites] = useState(props.state === undefined ? false : (props.state.favorite === undefined ? false : props.state.favorite));
    const [fromHome, setFromHome] = useState(props.state === undefined ? false : (props.state.favorite === undefined ? props.state.md===undefined?false:props.state.md : props.state.favorite))
    const [myPosts, setMyPosts] = useState(false);
    const [md, setmd] = useState(props.state===undefined? false : (props.state.md===undefined?false: props.state.md));

    useEffect(()=>{
        const setGo = ()=>{
            props.setGoToForum(false);
            props.setGoToGuide(false);
            props.setGoToHome(false);
            props.setGoToProfile(true);
        }
        setGo();
    }, [])

    return (<>
        {!myPosts && !favorites && !md && <ProfileHeader
        />}

        {props.userInfo !== undefined && !favorites && !myPosts && !md ? <><img
            alt=""
            src={props.userInfo.icon}
            width="200"
            height="200"
            className="mx-auto d-block mb-1 center-top mt-2"
        />

            <Row className="profile-buttons text-user-name mb-5">{props.userInfo.name}{props.userInfo.expert === "EXPERT" && (<Badge className="expert3 ml-2" variant="success">Expert</Badge>)}</Row>
            <Container >
                <Row className="profile-buttons">
                    <Button onClick={() => setFavorites(true)} size="lg" className="mb-4 borderbl buttonColor">
                        Favorite posts
                    </Button>
                </Row>
                <Row className="profile-buttons">
                    <Button onClick={() => setMyPosts(true)} size="lg" className="mb-4 borderbl buttonColor">
                        My posts
                    </Button>
                </Row>
                <Row className="profile-buttons">
                    <Button id="button" disabled size="lg" className="mb-4 borderbl buttonColor">
                        Settings
                    </Button>
                </Row>
                <Row className="profile-buttons">
                    <Button onClick={() => setmd(true)} size="lg" className="mb-4 borderbl buttonColor">
                        Help
                    </Button>
                </Row>
            </Container></> : <></>}
        {(props.userInfo !== undefined && favorites) &&
            <FavoritePostsCopy fromHome={fromHome} setFromHome={setFromHome}
                myPosts={myPosts}
                favorites={favorites}
                setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
                userInfo={props.userInfo}
                setMyPosts={setMyPosts}
                setFavorites={setFavorites}
            />}
        {(props.userInfo !== undefined && myPosts) &&
            <MyPosts
            fromHome={fromHome} setFromHome={setFromHome}
                setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
                userInfo={props.userInfo}
                setMyPosts={setMyPosts}
                setFavorites={setFavorites}
                myPosts={myPosts}
                favorites={favorites}
            />}
        {props.userInfo!==undefined && md && <HelpPage md={md} setmd={setmd} fromHome={fromHome} setFromHome={setFromHome}
                setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
                userInfo={props.userInfo}
                setMyPosts={setMyPosts}
                setFavorites={setFavorites}
                myPosts={myPosts}
                favorites={favorites}/>}
        {!myPosts && !favorites && !md && <PersonalizedNavbar setGoToHome={props.setGoToHome} setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide} setGoToForum={props.setGoToForum}
            currentPage={"profile"} />}
    </>)
}

export default ProfilePage;