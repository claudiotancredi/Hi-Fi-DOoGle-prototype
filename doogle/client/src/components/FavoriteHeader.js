import { Row, Col } from 'react-bootstrap';

import BackButtonProfile from "./BackButtonProfile";

function ProfileFavoriteHeaderCopy(props) {
    return (
        <>
            <Row className="guideheader">
                <Col xs="2">
                    <BackButtonProfile
                    md={props.md}
                    setmd={props.setmd}
                    setGoToHome={props.setGoToHome} setGoToProfile={props.setGoToProfile}
                    setGoToGuide={props.setGoToGuide} setGoToForum={props.setGoToForum}
                    fromHome={props.fromHome}
                    setFromHome={props.setFromHome}
                    setMyPosts={props.setMyPosts}
                    setFavorites={props.setFavorites}
                    setLoading={props.setLoading} setLoadingArray={props.setLoadingArray}
                    changed={props.changed} setChanged={props.setChanged}
                        setPostDetails={props.setPostDetails}
                        showPostDetails={props.showPostDetails}
                        newPost={props.newPost}
                        setNewPost={props.setNewPost}
                        setShowPostDetails={props.setShowPostDetails}
                        setNow={props.setNow}
                        setDirty={props.setDirty} 
                        text={props.text} setText={props.setText} type={props.type} setType={props.setType} mainT={props.mainT} setMainT={props.setMainT}
                        selectedTags={props.selectedTags} setSelectedTags={props.setSelectedTags} setIV={props.setIV} 
                        setShowModalDiscard={props.setShowModalDiscard}
                    showModalDiscard={props.showModalDiscard} IV={props.IV} resetForm={props.resetForm} setEditedDetails={props.setEditedDetails}
                    setEdited={props.setEdited}
                    setDeleted={props.setDeleted} commentValue={props.commentValue} reset={props.reset}
                    edit={props.edit} resetEditText={props.resetEditText} setEdit={props.setEdit} initialText={props.initialText}
                    initialSelectedTags={props.initialSelectedTags}
                    initialType={props.initialType}
                    initialMainT={props.initialMainT}/>
                </Col>
                <p className="forum-title">{props.t}</p>
            </Row>
        </>)
}

export default ProfileFavoriteHeaderCopy;