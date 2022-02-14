import API from "../API";
import React, { useState, useEffect } from 'react';
import ListOfPosts from "./ListOfPosts";
import FilterBar from "./FilterBar";
import FilterModal from "./FilterModal";
import AddPost from './AddPost';
import PersonalizedNavbarForum from './PersonalizedNavbarForum';
import ForumHeader from "./ForumHeader";
import { Container, Button, Alert, Toast } from 'react-bootstrap';
import ForumSearchBar from "./ForumSearchBar";
import PostDetails from "./PostDetails";

function ForumPage(props) {

    const [posts, setPosts] = useState([]);
    const [activeFilter, setActiveFilter] = useState((props.state === undefined || props.state.subcategory === undefined) ? [] : (props.state.subcategory === [] ? [] : props.state.subcategory));
    const [activeSort, setActiveSort] = useState(props.state === undefined ? 'newest' : (props.state.sort === undefined ? 'newest' : props.state.sort));
    const [dirty, setDirty] = useState(true);
    const [searching, setSearching] = useState(false);
    const [textSearching, setTextSearching] = useState("");
    const [searchedPosts, setSearchedPosts] = useState([]);
    const [showPostDetails, setShowPostDetails] = useState(false);
    const [postDetails, setPostDetails] = useState(undefined);
    const [newPost, setNewPost] = useState(props.state === undefined ? false : (props.state.newPost === undefined ? false : props.state.newPost));
    const [fromHome, setFromHome] = useState(props.state===undefined? false:props.state.newPost!==undefined?true:false);
    const [showModalDiscardButton, setShowModalDiscardButton] = useState(false);
    const [showModalDiscardBack, setShowModalDiscardBack] = useState(false);
    const [showfiltermodal, setShowfiltermodal] = useState(false);
    const [IV, setIV] = useState({ val: false })

    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [mainT, setMainT] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const [initialText, setInitialText] = useState('');
    const [initialType, setInitialType] = useState('');
    const [initialMainT, setInitialMainT] = useState('');
    const [initialSelectedTags, setInitialSelectedTags] = useState([]);

    const [published, setPublished] = useState(false);
    const [edited, setEdited] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [editedDetails, setEditedDetails] = useState(false);

    const [commentValue, setCommentValue] = useState("");

    const [changedComment, setChangedComment] = useState(false);

    const [loading, setLoading] = useState(true);
    const [noPosts, setNoPosts] = useState(false);
    const [npFilters, setnpFilters] = useState([]);
    const [now, setNow] = useState(0);

    const reset = () => {
        setCommentValue("");
    }

    const handleCommentValue = (e) => {
        setCommentValue(e.target.value);
    };

    const handleShowFilter = () => setShowfiltermodal(true);

    useEffect(() => {
        const getPosts = () => {
            if (dirty) {
                setnpFilters([]);
                API.getAllPosts(activeSort)
                    .then(ps => { setPosts(ps); })
                    .catch(() => { setPosts([]); })
                    .finally(() => { setDirty(false); setLoading(false) })
            }
            props.setGoToHome(false);
            props.setGoToForum(true);
            props.setGoToProfile(false);
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
            if (searching) {
                setSearchedPosts(() => posts.filter((p) => p.text.includes(textSearching)))
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
        const setNP = () => {
            if (!loading && !loadingArray.some(e => e === true)) {
                if ((searching && searchedPosts.length === 0) || (npFilters.length !== 0 && !npFilters.some((e, index) => {
                    if (searching) {
                        if (npFilters.length - index -1 < searchedPosts.length) {
                            return e === true;
                        }
                        else {
                            return false;
                        }
                    } else {
                        if (npFilters.length - index -1  < posts.length) {
                            return e === true;
                        }
                        else { return false }
                    }}))) {
                    /*
                    console.log((searching && searchedPosts.length === 0))
                    console.log((npFilters !== undefined && !npFilters.some(e => e === true)))
                    */
                    setNoPosts(true);
                }
                else {
                    setNoPosts(false);
                }
            }
        }
        setNP();
    }, [searchedPosts.length, searching, npFilters, loading, loadingArray])

    useEffect(() => {
        const setL = () => {
            if (loading === false) {
                if (!searching) {
                    setLoadingArray(new Array(posts.length).fill(true));
                }
                else {
                    setLoadingArray(new Array(searchedPosts.length).fill(true));
                }
            }
            if (!dirty) {
                setLoading(false);
            }
        }
        setL();
    }, [loading])

    return (
        <>
            <Container fluid className='px-0'>

                <ForumHeader
                    fromHome={fromHome}
                    setFromHome={setFromHome}
                    setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
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
                    setDirty={setDirty} setIV={setIV} IV={IV}
                    setNow={setNow}
                    text={text} setText={setText} type={type} setType={setType} mainT={mainT} setMainT={setMainT}
                    selectedTags={selectedTags} setSelectedTags={setSelectedTags} setShowModalDiscard={setShowModalDiscardBack}
                    showModalDiscard={showModalDiscardBack} resetForm={resetForm} setEditedDetails={setEditedDetails} setEdited={setEdited}
                    setDeleted={setDeleted} setPublished={setPublished} commentValue={commentValue} reset={reset} setEdit={setEdit} edit={edit} resetEditText={resetEditText} />

                {(!showPostDetails && !newPost) &&
                    <Container fluid className='px-0 mx-0'>
                        <ForumSearchBar
                            searching={searching}
                            setLoading={setLoading}
                            loading={loading}
                            loadingArray={loadingArray}
                            textSearching={textSearching}
                            setTextSearching={setTextSearching}
                            posts={posts}
                            setSearching={setSearching}
                            setSearchedPosts={setSearchedPosts} />
                        <FilterBar
                            setLoading={setLoading}
                            setLoadingArray={setLoadingArray}
                            loading={loading}
                            loadingArray={loadingArray}
                            handleShowFilter={handleShowFilter}
                            setActiveSort={setActiveSort}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            activeSort={activeSort}
                            setNow={setNow}
                            setDirty={setDirty}
                        />
                    </Container>
                }
            </Container>
            {(!showPostDetails && !newPost) &&
                <>
                    <Container fluid className="forumpage px-0" style={{ paddingBottom: (activeFilter.length/3)*13 + "%" }}>
                        {loading === false && !loadingArray.some(l => l === true) ? <>
                            {published && <Toast className="hideedit" delay={4000} onClose={() => setPublished(false)} autohide><Alert variant="success">Your post has been successfully published!</Alert></Toast>}
                            {edited && <Toast className="hideedit" delay={4000} onClose={() => setEdited(false)} autohide><Alert variant="success">Your post has been successfully edited!</Alert></Toast>}
                            {deleted && <Toast className="hideedit" delay={4000} onClose={() => setDeleted(false)} autohide><Alert variant="success">Your post has been successfully deleted!</Alert></Toast>}
                        </> : <></>}
                        {!searching ?
                            <ListOfPosts
                            now={now}
                            setNow={setNow}
                                noPosts={noPosts}
                                setNoPosts={setNoPosts}
                                setnpFilters={setnpFilters}
                                loadingArray={loadingArray}
                                setLoadingArray={setLoadingArray}
                                setLoading={setLoading}
                                loading={loading}
                                setSearchedPosts={setSearchedPosts}
                                setShowPostDetails={setShowPostDetails}
                                setPostDetails={setPostDetails}
                                setPosts={setPosts}
                                textSearching={textSearching}
                                nameuser={props.userInfo.name}
                                posts={posts}
                                loggedUser={props.userInfo.id}
                                typeuser={props.userInfo.expert}
                                dirty={dirty} setDirty={setDirty}
                                setNow={setNow}
                                activeFilter={activeFilter}
                                setNewPost={setNewPost}
                                setIV={setIV}
                                setEdited={setEdited}
                                setPublished={setPublished}
                                setDeleted={setDeleted}
                                setEditedDetails={setEditedDetails} />
                            :
                            <ListOfPosts
                            now={now}
                            setNow={setNow}
                                noPosts={noPosts}
                                setNoPosts={setNoPosts}
                                setnpFilters={setnpFilters}
                                loadingArray={loadingArray}
                                setLoadingArray={setLoadingArray}
                                setLoading={setLoading}
                                loading={loading}
                                setShowPostDetails={setShowPostDetails}
                                setPostDetails={setPostDetails}
                                setPosts={setPosts}
                                textSearching={textSearching}
                                setSearching={setSearching}
                                setSearchedPosts={setSearchedPosts}
                                searching={searching}
                                nameuser={props.userInfo.name}
                                posts={searchedPosts}
                                loggedUser={props.userInfo.id}
                                typeuser={props.userInfo.expert}
                                dirty={dirty}
                                setNow={setNow}
                                setDirty={setDirty}
                                activeFilter={activeFilter}
                                setNewPost={setNewPost}
                                setIV={setIV} setEdited={setEdited} setPublished={setPublished} setDeleted={setDeleted} setEditedDetails={setEditedDetails} />
                        }
                        {showfiltermodal &&
                            <FilterModal
                                setLoading={setLoading}
                                setLoadingArray={setLoadingArray}
                                setDirty={setDirty}
                                setNow={setNow}
                                setShowfiltermodal={setShowfiltermodal}
                                showfiltermodal={showfiltermodal}
                                activeFilter={activeFilter}
                                setActiveFilter={setActiveFilter} />
                        }

                        <Button
                            className='addbuttonORIGINALE buttonColor' disabled={loading === true || loadingArray.some(l => l === true)}
                            onClick={() => setNewPost(true)}>
                            New Post
                        </Button>


                    </Container>
                </>
            }
            {(showPostDetails && !newPost) &&
                <PostDetails
                    loading={loading}
                    setLoading={setLoading}
                    setLoadingArray={setLoadingArray}
                    setShowPostDetails={setShowPostDetails}
                    setSearchedPosts={setSearchedPosts}
                    posts={posts}
                    setPostDetails={setPostDetails}
                    setPosts={setPosts}
                    dirty={dirty}
                    setDirty={setDirty}
                    setNow={setNow}
                    loggedUser={props.userInfo.id}
                    typeuser={props.userInfo.expert}
                    nameuser={props.userInfo.name}
                    postDetails={postDetails}
                    setNewPost={setNewPost}
                    setIV={setIV} setEdited={setEdited} setPublished={setPublished} editedDetails={editedDetails} setEditedDetails={setEditedDetails} setDeleted={setDeleted}
                    commentValue={commentValue} reset={reset} handleCommentValue={handleCommentValue} edit={edit} setEdit={setEdit}
                    editText={editText} setEditText={setEditText} resetEditText={resetEditText} changed={changedComment} setChanged={setChangedComment} />
            }
            {newPost &&
                <AddPost
                setFromHome={setFromHome}
                    setLoading={setLoading}
                    setLoadingArray={setLoadingArray}
                    loggedUser={props.userInfo.id}
                    typeuser={props.userInfo.expert}
                    dirty={dirty}
                    setNow={setNow}
                    setDirty={setDirty}
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
                    selectedTags={selectedTags} setSelectedTags={setSelectedTags} resetForm={resetForm} setPublished={setPublished}
                    setEdited={setEdited} details={showPostDetails} setEditedDetails={setEditedDetails} setDeleted={setDeleted} />
            }
            <PersonalizedNavbarForum
            setFromHome={setFromHome}
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
                currentPage={"forum"}
                setActiveFilter={setActiveFilter}
                setActiveSort={setActiveSort}
                setNow={setNow}
                setDirty={setDirty}
                setSearching={setSearching}
                setTextSearching={setTextSearching}
                setSearchedPosts={setSearchedPosts}
                setShowPostDetails={setShowPostDetails}
                setPostDetails={setPostDetails}
                setNewPost={setNewPost}
                setShowfiltermodal={setShowfiltermodal}
                setIV={setIV}
                setText={setText}
                setType={setType}
                setMainT={setMainT}
                setSelectedTags={setSelectedTags}
                setPublished={setPublished}
                setEdited={setEdited}
                setDeleted={setDeleted}
                setEditedDetails={setEditedDetails}
                activeFilter={activeFilter}
                searching={searching}
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
            />
        </>
    )
}

export default ForumPage;