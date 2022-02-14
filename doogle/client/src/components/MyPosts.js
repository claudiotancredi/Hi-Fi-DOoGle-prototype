import API from "../API";
import React, { useState, useEffect } from 'react';
import ListOfPostsProfile from "./ListOfPostscopy";
import AddPost from './AddPost';
import PersonalizedNavbarProfile from './PersonalizedNavbarProfile';
import ProfileFavoriteHeaderCopy from "./FavoriteHeader";
import { Container,  Alert, Toast } from 'react-bootstrap';
import PostDetailsProfile from "./PostDetailscopy";

function FavoritePostsCopy(props) {

    const [posts, setPosts] = useState([]);
    const [dirty, setDirty] = useState(true);
    const [showPostDetails, setShowPostDetails] = useState(false);
    const [postDetails, setPostDetails] = useState(undefined);
    const [newPost, setNewPost] = useState(props.state === undefined ? false : (props.state.newPost === undefined ? false : props.state.newPost));
    const [showModalDiscardButton, setShowModalDiscardButton] = useState(false);
    const [showModalDiscardBack, setShowModalDiscardBack] = useState(false);
    const [IV, setIV] = useState({ val: false })

    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [mainT, setMainT] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const [initialText, setInitialText] = useState('');
    const [initialType, setInitialType] = useState('');
    const [initialMainT, setInitialMainT] = useState('');
    const [initialSelectedTags, setInitialSelectedTags] = useState([]);

    const [edited, setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [editedDetails, setEditedDetails] = useState(false);

    const [commentValue, setCommentValue] = useState("");

    const [changedComment, setChangedComment] = useState(false);

    const [loading, setLoading] = useState(true);
    const [now, setNow] = useState(0);

    const reset = () => {
        setCommentValue("");
    }

    const handleCommentValue = (e) => {
        setCommentValue(e.target.value);
    };

    useEffect(() => {
        const getPosts = () => {
            if (dirty) {
                API.getMine(props.userInfo.id)
                    .then(ps => { setPosts(ps) })
                    .catch(() => { setPosts([]); })
                    .finally(() => { setDirty(false); setLoading(false) })
            }
            props.setGoToHome(false);
            props.setGoToForum(false);
            props.setGoToProfile(true);
            props.setGoToGuide(false);
        }
        getPosts();
    }, [dirty])


    function resetForm() {
        setText('')
        setType('')
        setMainT('')
        setSelectedTags([])
        setInitialType("")
        setInitialText("")
        setInitialSelectedTags([])
        setInitialMainT("")
    }

    useEffect(() => {
        const setPDet = () => {
            if (postDetails !== undefined) {
                setPostDetails(posts.filter((p) => p.ID === postDetails.ID)[0])
            }
        }
        setPDet();
    }, [posts])

    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState('');

    const resetEditText = () => {
        setEditText("");
    }

    const [loadingArray, setLoadingArray] = useState([true]);

    useEffect(()=>{
        const setn = ()=>{
            if (!loading && loadingArray.every(e=>e===true)){
                setNow(30);
            }
            else if (!loading && loadingArray.some(e=>e===false)){
                setNow(30+70/loadingArray.length*loadingArray.filter(e=>e===false).length)
            }
        }
        setn();
    },[loading, loadingArray])

    useEffect(() => {
        const setL = () => {
            if (loading === false) {
                setLoadingArray(new Array(posts.length).fill(true));
            }
            if (!dirty) {
                setLoading(false);
            }
        }
        setL();
    }, [loading])

    return (
        <>
            <Container fluid >

                <ProfileFavoriteHeaderCopy
                setFromHome={props.setFromHome}
                t={"My posts"}
                    setMyPosts={props.setMyPosts}
                    setFavorites={props.setFavorites}
                    setLoading={setLoading}
                    setLoadingArray={setLoadingArray}
                    initialText={initialText}
                    initialSelectedTags={initialSelectedTags}
                    initialType={initialType}
                    initialMainT={initialMainT}
                    changed={changedComment} setChanged={setChangedComment}
                    setPostDetails={setPostDetails}
                    showPostDetails={showPostDetails}
                    newPost={newPost}
                    setNewPost={setNewPost}
                    setShowPostDetails={setShowPostDetails}
                    setNow={setNow}
                    setDirty={setDirty} setIV={setIV} IV={IV}
                    text={text} setText={setText} type={type} setType={setType} mainT={mainT} setMainT={setMainT}
                    selectedTags={selectedTags} setSelectedTags={setSelectedTags} setShowModalDiscard={setShowModalDiscardBack}
                    showModalDiscard={showModalDiscardBack} resetForm={resetForm} setEditedDetails={setEditedDetails} setEdited={setEdited}
                    setDeleted={setDeleted} commentValue={commentValue} reset={reset} setEdit={setEdit} edit={edit} resetEditText={resetEditText} />
            </Container>
            {(!showPostDetails && !newPost) &&
                <>
                    <Container fluid className="profilepage px-0">
                        {loading === false && !loadingArray.some(l => l === true) ? <>
                            {edited && <Toast className="hideedit" delay={4000} onClose={() => setEdited(false)} autohide><Alert variant="success">Your post has been successfully edited!</Alert></Toast>}
                            {deleted && <Toast className="hideedit" delay={4000} onClose={() => setDeleted(false)} autohide><Alert variant="success">Your post has been successfully deleted!</Alert></Toast>}
                        </> : <></>}
                            {!loading && !loadingArray.some(l=>l===true) && posts.length===0?<>
                                <p className="nomatch2 centermatch5">Sorry, you haven't published</p>
                        <p className="nomatch2 centermatch6">any posts yet.</p>
                            </>:<ListOfPostsProfile
                                loadingArray={loadingArray}
                                setLoadingArray={setLoadingArray}
                                setLoading={setLoading}
                                loading={loading}
                                setShowPostDetails={setShowPostDetails}
                                setPostDetails={setPostDetails}
                                setPosts={setPosts}
                                nameuser={props.userInfo.name}
                                posts={posts}
                                loggedUser={props.userInfo.id}
                                typeuser={props.userInfo.expert}
                                dirty={dirty} setDirty={setDirty} setNow={setNow} now={now}
                                setNewPost={setNewPost}
                                setIV={setIV} setEdited={setEdited} setDeleted={setDeleted} setEditedDetails={setEditedDetails} />}


                    </Container>
                </>
            }
            {(showPostDetails && !newPost) &&
                <PostDetailsProfile
                favorite={props.favorite}
                myPosts={props.myPosts}
                    loading={loading}
                    setLoading={setLoading}
                    setLoadingArray={setLoadingArray}
                    setShowPostDetails={setShowPostDetails}
                    posts={posts}
                    setPostDetails={setPostDetails}
                    setPosts={setPosts}
                    dirty={dirty}
                    setNow={setNow}
                    setDirty={setDirty}
                    loggedUser={props.userInfo.id}
                    typeuser={props.userInfo.expert}
                    nameuser={props.userInfo.name}
                    postDetails={postDetails}
                    setNewPost={setNewPost}
                    setIV={setIV} setEdited={setEdited} editedDetails={editedDetails} setEditedDetails={setEditedDetails} setDeleted={setDeleted}
                    commentValue={commentValue} reset={reset} handleCommentValue={handleCommentValue} edit={edit} setEdit={setEdit}
                    editText={editText} setEditText={setEditText} resetEditText={resetEditText} changed={changedComment} setChanged={setChangedComment} />
            }
            {newPost &&
                <AddPost
                setGoToHome={props.setGoToHome} setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide} setGoToForum={props.setGoToForum}
            fromHome={props.fromHome}
            setFromHome={props.setFromHome}
                    setLoading={setLoading}
                    setLoadingArray={setLoadingArray}
                    loggedUser={props.userInfo.id}
                    typeuser={props.userInfo.expert}
                    dirty={dirty}
                    setDirty={setDirty}
                    setNow={setNow}
                    setNewPost={setNewPost}
                    setShowModalDiscard={setShowModalDiscardButton}
                    showModalDiscard={showModalDiscardButton}
                    IV={IV}
                    initialText={initialText}
                    initialSelectedTags={initialSelectedTags}
                    initialType={initialType}
                    initialMainT={initialMainT}
                    setInitialMainT={setInitialMainT}
                    setInitialSelectedTags={setInitialSelectedTags}
                    setInitialText={setInitialText}
                    setInitialType={setInitialType}
                    setIV={setIV} text={text} setText={setText} type={type} setType={setType} mainT={mainT} setMainT={setMainT}
                    selectedTags={selectedTags} setSelectedTags={setSelectedTags} resetForm={resetForm} 
                    setEdited={setEdited} details={showPostDetails} setEditedDetails={setEditedDetails} setDeleted={setDeleted} />
            }
            <PersonalizedNavbarProfile
            setFromHome={props.setFromHome}
                showPostDetails={showPostDetails}
                commentValue={commentValue}
                text={text}
                selectedTags={selectedTags}
                type={type}
                mainT={mainT}
                val={IV.val}
                setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
                currentPage={"profile"}
                setDirty={setDirty}
                setShowPostDetails={setShowPostDetails}
                setPostDetails={setPostDetails}
                setNewPost={setNewPost}
                setIV={setIV}
                setText={setText}
                setType={setType}
                setMainT={setMainT}
                setSelectedTags={setSelectedTags}
                setEdited={setEdited}
                setDeleted={setDeleted}
                setEditedDetails={setEditedDetails}
                showPostDetails={showPostDetails}
                newPost={newPost}
                reset={reset}
                edit={edit}
                resetForm={resetForm}
                setEdit={setEdit}
                resetEditText={resetEditText}
                changed={changedComment} setChanged={setChangedComment}
                initialText={initialText}
                initialSelectedTags={initialSelectedTags}
                initialType={initialType}
                initialMainT={initialMainT}
                IV={IV}
                setLoading={setLoading}
                setLoadingArray={setLoadingArray}
                setMyPosts={props.setMyPosts}
                setFavorites={props.setFavorites}
            />
        </>
    )
}

export default FavoritePostsCopy;