import { Navbar, Container, Button, Col } from 'react-bootstrap';
import profileIcon from "../myicons/profile.png";
import guideIcon from "../myicons/guide.png";
import forumIcon from "../myicons/forum.png";
import homeIcon from "../myicons/home.png";
import ModalDiscardNavbarProfile from './ModalDiscardNavbarProfile';
import React, { useState, useEffect } from 'react';

function PersonalizedNavbarProfile(props) {

    const [md, setmd] = useState(false);
    const [section, setSection] = useState("");
    const [comment, setComment] = useState(false);

    const equals = (a, b) =>{
        return a.length === b.length &&
        a.every((v, i) => v === b[i]);
        }

    useEffect(() => {
        const setC = () => {
            setComment(props.showPostDetails && props.commentValue !== "");
        }
        setC();
    }, [props])

    return (
        <div className='navbar'>
            <Navbar bg="dark" variant="dark" fixed="bottom" >
                <Container>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "home" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "home"}
                                onClick={() => {
                                    if ((props.newPost && (
                                    (props.IV.val && (props.text!==props.initialText || props.mainT!==props.initialMainT || props.type!==props.initialType || !equals(props.selectedTags, props.initialSelectedTags))))) || (props.showPostDetails && props.commentValue !== "")
                                        || (props.showPostDetails && props.edit && props.changed)) {
                                        setSection("Home");
                                        setmd(true);
                                    }
                                    else {
                                        props.setGoToHome(true);
                                        props.setGoToForum(false);
                                        props.setGoToProfile(false);
                                        props.setGoToGuide(false);
                                    }
                                }}>
                                <img
                                    alt=""
                                    src={homeIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Home</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "guide" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "guide"}
                                onClick={() => {
                                    if ((props.newPost && (
                                    (props.IV.val && (props.text!==props.initialText || props.mainT!==props.initialMainT || props.type!==props.initialType || !equals(props.selectedTags, props.initialSelectedTags))))) || (props.showPostDetails && props.commentValue !== "")
                                        || (props.showPostDetails && props.edit && props.changed)) {
                                        setSection("Guide");
                                        setmd(true);
                                    }
                                    else {
                                        props.setGoToHome(false);
                                        props.setGoToForum(false);
                                        props.setGoToProfile(false);
                                        props.setGoToGuide(true);
                                    }
                                }
                                }>
                                <img
                                    alt=""
                                    src={guideIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Guide</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "forum" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "forum"}
                                onClick={() => {
                                    if ((props.newPost && (
                                    (props.IV.val && (props.text!==props.initialText || props.mainT!==props.initialMainT || props.type!==props.initialType || !equals(props.selectedTags, props.initialSelectedTags))))) || (props.showPostDetails && props.commentValue !== "")
                                        || (props.showPostDetails && props.edit && props.changed)) {
                                        setSection("Forum");
                                        setmd(true);
                                    }
                                    else {
                                        props.setGoToHome(false);
                                        props.setGoToForum(true);
                                        props.setGoToProfile(false);
                                        props.setGoToGuide(false);
                                    }
                                }}>
                                <img
                                    alt=""
                                    src={forumIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Forum</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "profile" ? "primary" : "link outline-light"} className="notactivepage"
                                onClick={() => {
                                    if ((props.newPost && (
                                    (props.IV.val && (props.text!==props.initialText || props.mainT!==props.initialMainT || props.type!==props.initialType || !equals(props.selectedTags, props.initialSelectedTags))))) || (props.showPostDetails && props.commentValue !== "")
                                        || (props.showPostDetails && props.edit && props.changed)) {
                                        setSection("Profile");
                                        setmd(true);
                                    }
                                    else {
                                        props.setMyPosts(false);
                                        props.setFavorites(false);
                                        if (props.setmd){
                                            props.setmd(false);
                                        }
                                        props.setFromHome(false);
                                    }
                                }}>
                                <img
                                    alt=""
                                    src={profileIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Profile</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                </Container>
            </Navbar>
            {md && <ModalDiscardNavbarProfile
                changed={props.changed}
                setChanged={props.setChanged}
                comment={comment}
                setComment={setComment}
                reset={props.reset}
                setmd={setmd}
                md={md}
                setGoToForum={props.setGoToForum}
                setGoToProfile={props.setGoToProfile}
                setGoToHome={props.setGoToHome}
                setGoToGuide={props.setGoToGuide}
                section={section}
                setDirty={props.setDirty}
                setShowPostDetails={props.setShowPostDetails}
                setPostDetails={props.setPostDetails}
                setNewPost={props.setNewPost}
                setIV={props.setIV}
                setText={props.setText}
                setType={props.setType}
                setMainT={props.setMainT}
                setSelectedTags={props.setSelectedTags}
                setEdited={props.setEdited}
                setDeleted={props.setDeleted}
                setEditedDetails={props.setEditedDetails}
                val={props.val}
                edit={props.edit}
                resetEditText={props.resetEditText}
                setEdit={props.setEdit}
                resetForm={props.resetForm}
                setLoading={props.setLoading}
                setLoadingArray={props.setLoadingArray}
                setMyPosts={props.setMyPosts}
                setFavorites={props.setFavorites}
            />}
        </div>
    )
}
export default PersonalizedNavbarProfile;