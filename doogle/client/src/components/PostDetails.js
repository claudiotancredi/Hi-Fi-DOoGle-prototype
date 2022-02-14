import React, { useState, useEffect } from 'react';
import API from '../API';
import PostElement from './PostElement';
import { Col, Card, Dropdown, Button, Row, Container, Badge, Alert, Toast } from 'react-bootstrap';
import ellipsis from '../myicons/ellipsis.png';
import TagElement from './TagElement';
import brokenHeart from '../myicons/broken-heart.png';
import heart from '../myicons/heart.png';
import comment from '../myicons/comment.png'
import uparrow from '../myicons/up-arrow.png'
import bookmark from '../myicons/bookmark.png';
import Comment from './Comment';
import CommentBox from './CommentBox';
import ModalDelete from './ModalDelete';
import { Line } from 'rc-progress';

function PostComments(props) {

    return (
        <>
            {props.commented.map((c, index) => (<Comment index={index} loading={props.loading} setLoading={props.setLoading} loadingArray={props.loadingArray} setLoadingArray={props.setLoadingArray} changed={props.changed} setChanged={props.setChanged} key={c.ID} ID={c.ID} userID={c.userID} text={c.text}
                postID={props.postDetails.ID} setDirty={props.setDirty} loggedUser={props.loggedUser}
                setEdited={props.setEdited} setDeleted={props.setDeleted} setFlagCommented={props.setFlagCommented} setEditedDetails={props.setEditedDetails}
                edit={props.edit} setEdit={props.setEdit}
                editText={props.editText} setEditText={props.setEditText} resetEditText={props.resetEditText}></Comment>))}
        </>)
}

function PostDetails(props) {

    const [commented, setCommented] = useState([]);

    const [tags, setTags] = useState([]); //tags of the post
    const [dirtyTags, setDirtyTags] = useState(true);

    const [liked, setLiked] = useState([]); //likes of the logged user
    const [dirtyLikes, setDirtyLikes] = useState(true);

    const [disliked, setDisliked] = useState([]); //dislikes of the logged user
    const [dirtyDislikes, setDirtyDislikes] = useState(true);

    const [upped, setUpped] = useState([]); //ups of the logged user
    const [dirtyUps, setDirtyUps] = useState(true);

    const [saved, setSaved] = useState([]); //saved of the logged user
    const [dirtySaved, setDirtySaved] = useState(true);

    const [postuser, setPostuser] = useState({ name: "", expert: "", icon: "" });

    const [showModalDelete, setShowModalDelete] = useState(false)

    const [flagCommented, setFlagCommented] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

    const [loadingPost, setLoadingPost] = useState(true);
    const [dirtyComments, setDirtyComments] = useState(true);

    const [now, setNow] = useState(0);

    useEffect(() => {
        const setL = () => {
            if (!dirtyTags && !dirtyComments && !dirtyLikes && !dirtyDislikes && !dirtyUps && !dirtySaved) {
                setLoadingPost(false);
            }
        }
        setL();
    }, [dirtyTags, dirtyLikes, dirtyDislikes, dirtyUps, dirtySaved, dirtyComments])

    const [loadingArray, setLoadingArray] = useState([true]);

    useEffect(()=>{
        const setn = ()=>{
            if (!loadingPost && loadingArray.every(e=>e===true)){
                setNow(30);
            }
            else if (!loadingPost && loadingArray.some(e=>e===false)){
                setNow(30+70/loadingArray.length*loadingArray.filter(e=>e===false).length)
            }
        }
        setn();
    },[loadingPost, loadingArray])


    useEffect(() => {
        const setL = () => {
            if (loadingPost === false) {
                setLoadingArray(new Array(commented.length).fill(true));
            }
        }
        setL();
    }, [loadingPost])



    const submitCommentLine = (e) => {
        e.preventDefault();
        const newComment = { postID: props.postDetails.ID, userID: props.loggedUser, text: props.commentValue }
        API.addNewComment(newComment).then(() => { setDeleted(false); setEdited(false); props.setDeleted(false); props.setEdited(false); props.setPublished(false); props.setEditedDetails(false); setFlagCommented(true); props.setDirty(true); })
        props.reset();
    };

    const enterCommentLine = (e) => {
        if (e.charCode === 13) {
            const newComment = { postID: props.postDetails.ID, userID: props.loggedUser, text: props.commentValue }
            API.addNewComment(newComment).then(() => { setDeleted(false); setEdited(false); props.setDeleted(false); props.setEdited(false); props.setPublished(false); props.setEditedDetails(false); setFlagCommented(true); props.setDirty(true); })
            props.reset();
        }
    };

    const handleNewSaved = () => {
        if (saved.some(e => e.postID === props.postDetails.ID)) {
            let post = saved.filter(e => e.postID === props.postDetails.ID)
            let postID = post[0].ID

            API.DeleteAssociate('SAVED', postID, props.postDetails.ID).then(() => { setDirtySaved(true); props.setDirty(true) });
        } else {
            //mettere like
            const newAss = { VAL: 'SAVED', userID: props.loggedUser, postID: props.postDetails.ID }
            API.addNewAssociate(newAss).then(() => { setDirtySaved(true); props.setDirty(true) });
        }
    }
    //handle newliked
    const handleLikeClick = () => {
        if (liked.some(e => e.postID === props.postDetails.ID)) {
            let post = liked.filter(e => e.postID === props.postDetails.ID)
            let postID = post[0].ID

            API.DeleteAssociate('LIKED', postID, props.postDetails.ID).then(() => {
                setDirtyLikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes - 1, p.dislikes, p.ups, p.comments) : p));
                props.setSearchedPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes - 1, p.dislikes, p.ups, p.comments) : p))
                props.setPostDetails(new PostElement(props.postDetails.ID, props.postDetails.author, props.postDetails.text, props.postDetails.likes - 1, props.postDetails.dislikes, props.postDetails.ups, props.postDetails.comments))
            });
        } else {
            //mettere like
            const newAss = { VAL: 'LIKED', userID: props.loggedUser, postID: props.postDetails.ID }
            API.addNewAssociate(newAss).then(() => {
                setDirtyLikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes + 1, p.dislikes, p.ups, p.comments) : p));
                props.setSearchedPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes + 1, p.dislikes, p.ups, p.comments) : p))
                props.setPostDetails(new PostElement(props.postDetails.ID, props.postDetails.author, props.postDetails.text, props.postDetails.likes + 1, props.postDetails.dislikes, props.postDetails.ups, props.postDetails.comments))
            });
        }
    }

    const handleUpClick = () => {
        if (upped.some(e => e.postID === props.postDetails.ID)) {
            //togliere up
            let post = upped.filter(e => e.postID === props.postDetails.ID)
            let postID = post[0].ID

            API.DeleteAssociate('UPPED', postID, props.postDetails.ID).then(() => {
                setDirtyUps(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes, p.ups - 1, p.comments) : p));
                props.setSearchedPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes, p.ups - 1, p.comments) : p))
                props.setPostDetails(new PostElement(props.postDetails.ID, props.postDetails.author, props.postDetails.text, props.postDetails.likes, props.postDetails.dislikes, props.postDetails.ups - 1, props.postDetails.comments))
            })
        } else {
            //mettere up
            const newAss = { VAL: 'UPPED', userID: props.loggedUser, postID: props.postDetails.ID }
            API.addNewAssociate(newAss).then(() => {
                setDirtyUps(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes, p.ups + 1, p.comments) : p));
                props.setSearchedPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes + 1, p.dislikes, p.ups, p.comments) : p))
                props.setPostDetails(new PostElement(props.postDetails.ID, props.postDetails.author, props.postDetails.text, props.postDetails.likes, props.postDetails.dislikes, props.postDetails.ups + 1, props.postDetails.comments))
            })
        }
    }

    //handle newdisliked
    const handleDislikeClick = () => {
        if (disliked.some(e => e.postID === props.postDetails.ID)) {
            //togliere dislike
            let post = disliked.filter(e => e.postID === props.postDetails.ID)
            let postID = post[0].ID

            API.DeleteAssociate('DISLIKED', postID, props.postDetails.ID).then(() => {
                setDirtyDislikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes - 1, p.ups, p.comments) : p));
                props.setSearchedPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes - 1, p.ups, p.comments) : p))
                props.setPostDetails(new PostElement(props.postDetails.ID, props.postDetails.author, props.postDetails.text, props.postDetails.likes, props.postDetails.dislikes - 1, props.postDetails.ups, props.postDetails.comments))
            })
        } else {
            //mettere dislike
            const newAss = { VAL: 'DISLIKED', userID: props.loggedUser, postID: props.postDetails.ID }
            API.addNewAssociate(newAss).then(() => {
                setDirtyDislikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes + 1, p.ups, p.comments) : p));
                props.setSearchedPosts((pl) => pl.map((p) => p.ID === props.postDetails.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes + 1, p.ups, p.comments) : p))
                props.setPostDetails(new PostElement(props.postDetails.ID, props.postDetails.author, props.postDetails.text, props.postDetails.likes, props.postDetails.dislikes + 1, props.postDetails.ups, props.postDetails.comments))
            })
        }
    }

    useEffect(() => {
        const getComments = () => {

            API.getCommentsForOnePost(props.postDetails.ID)
                .then(t => setCommented(t))
                .catch(() => setCommented([]))
                .finally(setDirtyComments(false))

        }
        getComments();
    }, [props.dirty])

    useEffect(() => {
        const getPostUser = () => {
            if (props.dirty || postuser.name === "") {
                API.getUserInfo(props.postDetails.author)
                    .then(u => setPostuser(u))
                    .catch(() => setPostuser())
                    .finally(() => { props.setDirty(false); })
            }
        }
        getPostUser();
    }, [props.dirty])

    //get tags of the post
    useEffect(() => {
        const getTags = () => {
            if (dirtyTags) {
                API.getTagsForOnePost(props.postDetails.ID)
                    .then(t => setTags(t))
                    .catch(() => setTags([]))
                    .finally(() => { setDirtyTags(false); })
            }
        }
        getTags();
    }, [dirtyTags])

    //get ups for the user
    useEffect(() => {
        const getUps = () => {
            if (dirtyUps) {
                API.getUpsForOneUser(props.loggedUser)
                    .then(t => setUpped(t))
                    .catch(() => setUpped([]))
                    .finally(() => { setDirtyUps(false); })
            }
        }
        getUps();
    }, [dirtyUps])

    //get likes for the user
    useEffect(() => {
        const getLikes = () => {
            if (dirtyLikes) {
                API.getLikesForOneUser(props.loggedUser)
                    .then(t => setLiked(t))
                    .catch(() => setLiked([]))
                    .finally(() => { setDirtyLikes(false); })
            }
        }
        getLikes();
    }, [dirtyLikes])

    //get dislikes for the user
    useEffect(() => {
        const getDislikes = () => {
            if (dirtyDislikes) {
                API.getDislikesForOneUser(props.loggedUser)
                    .then(t => setDisliked(t))
                    .catch(() => setDisliked([]))
                    .finally(() => { setDirtyDislikes(false); })
            }
        }
        getDislikes();
    }, [dirtyDislikes])

    //get saved posts for the user
    useEffect(() => {
        const getSaved = () => {
            if (dirtySaved) {
                API.getSavedForOneUser(props.loggedUser)
                    .then(t => setSaved(t))
                    .catch(() => setSaved([]))
                    .finally(() => { setDirtySaved(false); })
            }
        }
        getSaved();
    }, [dirtySaved])

    const handleDelete = () => {
        API.DeletePostById(props.postDetails.ID).then(() => { props.setEditedDetails(false); props.setEdited(false); props.setPublished(false); props.setDeleted(true); props.setShowPostDetails(false); props.setPostDetails(undefined); props.setEdit(false); props.setChanged(false); props.setNow(0); props.setDirty(true); props.setLoading(true); props.setLoadingArray([true]) })
    }

    function editPost() {
        props.setEdit(false);
        props.setChanged(false);
        props.resetEditText();
        props.setIV({ id: props.postDetails.ID, text: props.postDetails.text.charAt(0).toUpperCase() + props.postDetails.text.slice(1), allTags: tags, val: true });
        props.setNewPost(true);
    }

    return (<>
        {!loadingPost && !loadingArray.some(l => l === true) ? <>{props.editedDetails && <Toast className="hideedit mt-2" delay={4000} onClose={() => props.setEditedDetails(false)} autohide><Alert variant="success">Your post has been successfully edited!</Alert></Toast>}
            {flagCommented && <Toast className="hideedit mt-2" delay={4000} onClose={() => setFlagCommented(false)} autohide><Alert variant="success">Your comment has been succesfully published!</Alert></Toast>}
            {deleted && <Toast className="hideedit mt-2" delay={4000} onClose={() => setDeleted(false)} autohide><Alert variant="success">Your comment has been succesfully deleted!</Alert></Toast>}
            {edited && <Toast className="hideedit mt-2" delay={4000} onClose={() => setEdited(false)} autohide><Alert variant="success">Your comment has been succesfully edited!</Alert></Toast>}</> : <></>}
        <Card className={!(props.editedDetails || flagCommented || deleted || edited) ? "cardflex postScroll" : "cardflex postScrollalternative"}>
            {/*per i tre puntini o il segnalibro */}
            {!loadingPost && !loadingArray.some(l => l === true) ? <>
                {props.loggedUser === props.postDetails.author ?
                    <div className="toprightbuttonellipsis"><Dropdown animation="off">
                        <Dropdown.Toggle className="symbolDropdown" variant="outline-light" >
                            <img
                                alt=""
                                src={ellipsis}
                                width="30"
                                height="30"
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleNewSaved}>{saved.some(e => e.postID === props.postDetails.ID) ? "Remove from favorites" : "Add to favorites"}</Dropdown.Item>
                            <Dropdown.Item onClick={editPost}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => setShowModalDelete(true)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    : <div className="toprightbuttonfav"><Button variant={saved.some(e => e.postID === props.postDetails.ID) ? "primary" : "light"} onClick={handleNewSaved} >
                        <img
                            alt=""
                            src={bookmark}
                            width="30"
                            height="30"
                        />
                    </Button></div>}
                <Card.Body>
                    <Row className="mb-2">
                        <Col className="author" xs={2}>
                            <img
                                alt=""
                                src={postuser.icon}
                                width="35"
                                height="35"
                            />
                        </Col>
                        <Col className="author" xs={6}>
                            <Card.Text >
                                {postuser.name} {postuser.expert && (<Badge className="expert" variant="success">Expert</Badge>)}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="postText">
                            <Card.Text className='overflowtext2'>
                                {props.postDetails.text.charAt(0).toUpperCase() + props.postDetails.text.slice(1)}
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row>
                        {tags.map((t) => { if (t !== "Expert") return (<TagElement key={t} tag={t}></TagElement>); else return <div key={t}></div> })}
                    </Row>
                    <Row>
                        <Col style={{ textAlign: 'right' }}>
                            {/*for comments*/}
                            <Button className="mr-1" disabled variant="light" style={{ height: '55px', width: '55px' }}>
                                <Card.Img src={comment} ></Card.Img>
                                {props.postDetails.comments}
                            </Button>
                            {/*for full heart*/}

                            <Button className="mr-1" disabled={disliked.some(e => e.postID === props.postDetails.ID)}
                                variant={liked.some(e => e.postID === props.postDetails.ID) ? "primary" : "light"}
                                onClick={handleLikeClick}
                                style={{ height: '55px', width: '55px' }}>
                                <Card.Img src={heart}></Card.Img>
                                {props.postDetails.likes}
                            </Button>
                            {/*for broken heart*/}
                            <Button className="mr-1" disabled={liked.some(e => e.postID === props.postDetails.ID) || upped.some(e => e.postID === props.postDetails.ID)}
                                variant={disliked.some(e => e.postID === props.postDetails.ID) ? "primary" : "light"}
                                style={{ height: '55px', width: '55px' }}
                                onClick={handleDislikeClick}>
                                <Card.Img src={brokenHeart}></Card.Img>
                                {props.postDetails.dislikes}
                            </Button>
                            {/*for ups*/}
                            <Button
                            className="buttonup"
                                disabled={!props.typeuser || disliked.some(e => e.postID === props.postDetails.ID)}
                                variant={upped.some(e => e.postID === props.postDetails.ID) ? "primary" : "light"}
                                style={{ height: '55px', width: '55px' }}
                                onClick={handleUpClick}>
                                <Card.Img src={uparrow}></Card.Img>
                                {props.postDetails.ups}
                            </Button>
                        </Col>
                    </Row>
                </Card.Body></> : <></>}
            <Container className="commentScroll" style={{ marginTop: (Math.ceil(props.postDetails.text.length / 30) > 1 ? Math.ceil(props.postDetails.text.length / 30) * 8 : Math.ceil(props.postDetails.text.length / 30) * 12) + "%" }}>
                <PostComments loading={loadingPost} setLoading={setLoadingPost} loadingArray={loadingArray} setLoadingArray={setLoadingArray} changed={props.changed} setChanged={props.setChanged} edit={props.edit} setEdit={props.setEdit}
                    editText={props.editText} setEditText={props.setEditText} resetEditText={props.resetEditText} setEdited={setEdited} setDeleted={setDeleted} setFlagCommented={setFlagCommented} setEditedDetails={props.setEditedDetails} loggedUser={props.loggedUser} commented={commented} postDetails={props.postDetails} setDirty={props.setDirty} dirty={props.dirty} />
            </Container>
        </Card >
        {showModalDelete && <ModalDelete setShowModalDelete={setShowModalDelete} showModalDelete={showModalDelete} handleDelete={handleDelete} />}
        {(loadingPost || loadingArray.some(e => e === true)) &&
            <Row>
                <div className="center2 cont-size"><b className="aligntocenter">Loading Progress: {now.toString().split(".")[0]}%</b><Line percent={now} strokeWidth="5" strokeColor="#ff780a" /></div>
            </Row>
        }
        <Row className="furtherhelp">
            <CommentBox loading={loadingPost} loadingArray={loadingArray} commentValue={props.commentValue}
                handleCommentValue={props.handleCommentValue}
                submitCommentLine={submitCommentLine}
                enterCommentLine={enterCommentLine}>
            </CommentBox>
        </Row>
    </>)
}

export default PostDetails;