import { Row, Col } from 'react-bootstrap';

import BackButtonForum from "./BackButtonForum";

function ForumHeader(props) {
    return (
        <>
            <Row className="guideheader">
                <Col xs="2">
                    <BackButtonForum
                    fromHome={props.fromHome}
                    setFromHome={props.setFromHome}
                    setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
                    setLoading={props.setLoading} setLoadingArray={props.setLoadingArray}
                    changed={props.changed} setChanged={props.setChanged}
                        setPostDetails={props.setPostDetails}
                        showPostDetails={props.showPostDetails}
                        newPost={props.newPost}
                        setNewPost={props.setNewPost}
                        setShowPostDetails={props.setShowPostDetails}
                        setDirty={props.setDirty} 
                        setNow={props.setNow}
                        text={props.text} setText={props.setText} type={props.type} setType={props.setType} mainT={props.mainT} setMainT={props.setMainT}
                        selectedTags={props.selectedTags} setSelectedTags={props.setSelectedTags} setIV={props.setIV} 
                        setShowModalDiscard={props.setShowModalDiscard}
                    showModalDiscard={props.showModalDiscard} IV={props.IV} resetForm={props.resetForm} setEditedDetails={props.setEditedDetails}
                    setEdited={props.setEdited}
                    setDeleted={props.setDeleted} setPublished={props.setPublished} commentValue={props.commentValue} reset={props.reset}
                    edit={props.edit} resetEditText={props.resetEditText} setEdit={props.setEdit} initialText={props.initialText}
                    initialSelectedTags={props.initialSelectedTags}
                    initialType={props.initialType}
                    initialMainT={props.initialMainT}/>
                </Col>
                <p className="forum-title">Forum</p>
            </Row>
        </>)
}

export default ForumHeader;