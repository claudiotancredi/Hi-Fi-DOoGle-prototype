import { Card, Button, Row, Col, Dropdown, Badge } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import TagElement from './TagElement';
import API from '../API';


import brokenHeart from '../myicons/broken-heart.png';
import heart from '../myicons/heart.png';
import comment from '../myicons/comment.png'
import uparrow from '../myicons/up-arrow.png'
import bookmark from '../myicons/bookmark.png'
import ellipsis from '../myicons/ellipsis.png'
import PostElement from './PostElement';
import ModalDelete from './ModalDelete';

function PostProfile(props) {

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

    /*const [showmodify, setShowmodify] = useState(false);*/
    const [showModalDelete, setShowModalDelete] = useState(false);

    /*const handleCloseModify = () => { setShowmodify(false); props.setDirty(true); }*/
    /*const handleShowModify = () => { setShowmodify(true); props.setDirty(true); }*/

    const handleShowDetails = () => {
        props.setPostDetails({
            ID: props.ID,
            author: props.author,
            text: props.text,
            likes: props.likes,
            dislikes: props.dislikes,
            ups: props.ups,
            comments: props.comments
        }
        )
        props.setShowPostDetails(true);
    };

    const handleDelete = () => {
        API.DeletePostById(props.ID).then(() => { props.setEditedDetails(false); props.setEdited(false); props.setDeleted(true); props.setNow(0); props.setDirty(true); props.setLoading(true); props.setLoadingArray([true])})
    }

    const handleNewSaved = () => {
        if (saved.some(e => e.postID === props.ID)) {
            let post = saved.filter(e => e.postID === props.ID)
            let postID = post[0].ID

            API.DeleteAssociate('SAVED', postID, props.ID).then(() => { setDirtySaved(true); props.setDirty(true) });
        } else {
            //mettere like
            const newAss = { VAL: 'SAVED', userID: props.loggedUser, postID: props.ID }
            API.addNewAssociate(newAss).then(() => { setDirtySaved(true); props.setDirty(true) });
        }
    }
    //handle newliked
    const handleLikeClick = () => {
        if (liked.some(e => e.postID === props.ID)) {
            let post = liked.filter(e => e.postID === props.ID)
            let postID = post[0].ID

            API.DeleteAssociate('LIKED', postID, props.ID).then(() => {
                setDirtyLikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.ID ? new PostElement(p.ID, p.author, p.text, p.likes - 1, p.dislikes, p.ups, p.comments) : p))
            });
        } else {
            //mettere like
            const newAss = { VAL: 'LIKED', userID: props.loggedUser, postID: props.ID }
            API.addNewAssociate(newAss).then(() => {
                setDirtyLikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.ID ? new PostElement(p.ID, p.author, p.text, p.likes + 1, p.dislikes, p.ups, p.comments) : p))
            });

        }
    }

    const handleUpClick = () => {
        if (upped.some(e => e.postID === props.ID)) {
            //togliere up
            let post = upped.filter(e => e.postID === props.ID)
            let postID = post[0].ID

            API.DeleteAssociate('UPPED', postID, props.ID).then(() => {
                setDirtyUps(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes, p.ups - 1, p.comments) : p))
            })
        } else {
            //mettere up
            const newAss = { VAL: 'UPPED', userID: props.loggedUser, postID: props.ID }
            API.addNewAssociate(newAss).then(() => {
                setDirtyUps(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes, p.ups + 1, p.comments) : p))
            })
        }
    }

    //handle newdisliked
    const handleDislikeClick = () => {
        if (disliked.some(e => e.postID === props.ID)) {
            //togliere dislike
            let post = disliked.filter(e => e.postID === props.ID)
            let postID = post[0].ID

            API.DeleteAssociate('DISLIKED', postID, props.ID).then(() => {
                setDirtyDislikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes - 1, p.ups, p.comments) : p))
            })
        } else {
            //mettere dislike
            const newAss = { VAL: 'DISLIKED', userID: props.loggedUser, postID: props.ID }
            API.addNewAssociate(newAss).then(() => {
                setDirtyDislikes(true);
                props.setPosts((pl) => pl.map((p) => p.ID === props.ID ? new PostElement(p.ID, p.author, p.text, p.likes, p.dislikes + 1, p.ups, p.comments) : p))
            })
        }
    }

    useEffect(() => {
        const getPostUser = () => {
            if (props.dirty || postuser.name === "") {
                API.getUserInfo(props.author)
                    .then(u => setPostuser(u))
                    .catch(() => setPostuser())
                    .finally(() => { props.setDirty(false); })
            }
        }
        getPostUser();
        /*console.log(postuser)*/
    }, [props.dirty])

    //get tags of the post
    useEffect(() => {
        const getTags = () => {
            if (dirtyTags) {
                API.getTagsForOnePost(props.ID)
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

    useEffect(()=>{
        const setLoadFalse = ()=>{
            if (dirtyDislikes===false && dirtyLikes===false && dirtySaved===false && dirtyTags===false && dirtyUps===false){
                props.setLoadingArray((l) => l.map((lo, i)=>{if(i===props.index) return false; else return lo}));
            }
        }
        setLoadFalse();
    },[dirtyDislikes, dirtyLikes, dirtySaved, dirtyTags, dirtyUps])

    function editPost() {
        props.setIV({ id: props.ID, text: props.text.charAt(0).toUpperCase() + props.text.slice(1), allTags: tags, val: true })
        props.setNewPost(true)
    }

    return (
        <>
        {!props.loadingArray.some(l=>l===true)  &&
                <>
                    <Card className="cardflex">
                        {/*per i tre puntini o il segnalibro */}
                        {props.loggedUser === props.author ?
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
                                    <Dropdown.Item onClick={handleNewSaved}>{saved.some(e => e.postID === props.ID) ? "Remove from favorites" : "Add to favorites"}</Dropdown.Item>
                                    <Dropdown.Item onClick={editPost}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setShowModalDelete(true)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            : <div className="toprightbuttonfav"><Button variant={saved.some(e => e.postID === props.ID) ? "primary" : "light"} onClick={handleNewSaved} >
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
                                    <Col className="postText" onClick={handleShowDetails}>

                                        <Card.Text className='overflowtext'>
                                            {props.text.charAt(0).toUpperCase() + props.text.slice(1)}
                                        </Card.Text>
                                    </Col>
                            </Row>
                            <Row>
                                    {tags.map((t) => { if (t !== "Expert") return (<TagElement key={t} tag={t}></TagElement>); else return <div key={t}></div> })}
                            </Row>
                            <Row>
                                <Col style={{ textAlign: 'right' }}>
                                    {/*for comments*/}
                                    <Button className="mr-1" onClick={handleShowDetails} variant="light" style={{ height: '55px', width: '55px' }}>
                                        <Card.Img src={comment} ></Card.Img>
                                        {props.comments}
                                    </Button>
                                    {/*for full heart*/}

                                    <Button className="mr-1" disabled={disliked.some(e => e.postID === props.ID)}
                                        variant={liked.some(e => e.postID === props.ID) ? "primary" : "light"}
                                        onClick={handleLikeClick}
                                        style={{ height: '55px', width: '55px' }}>
                                        <Card.Img src={heart}></Card.Img>
                                        {props.likes}
                                    </Button>
                                    {/*for broken heart*/}
                                    <Button className="mr-1" disabled={liked.some(e => e.postID === props.ID) || upped.some(e => e.postID === props.ID)}
                                        variant={disliked.some(e => e.postID === props.ID) ? "primary" : "light"}
                                        style={{ height: '55px', width: '55px' }}
                                        onClick={handleDislikeClick}>
                                        <Card.Img src={brokenHeart}></Card.Img>
                                        {props.dislikes}
                                    </Button>
                                    {/*for ups*/}
                                    <Button
                                        disabled={!props.typeuser || disliked.some(e => e.postID === props.ID)}
                                        variant={upped.some(e => e.postID === props.ID) ? "primary" : "light"}
                                        style={{ height: '55px', width: '55px' }}
                                        onClick={handleUpClick}>
                                        <Card.Img src={uparrow}></Card.Img>
                                        {props.ups}
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card >
                    {showModalDelete && <ModalDelete setShowModalDelete={setShowModalDelete} showModalDelete={showModalDelete} handleDelete={handleDelete} />}
                </>}
        </>
    )

}

export default PostProfile;