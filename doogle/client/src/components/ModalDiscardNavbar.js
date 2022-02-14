import { Modal, Container, Row, Button } from 'react-bootstrap';

function ModalDiscardNavbar(props) {
    return (
        <Modal
            variant="danger"
            onHide={() => props.setmd(false)}
            show={props.md}
            size="lg"
            aria-labelledby="discard-modal"
            centered
            backdrop="static"
            animation={false}
        >
            <Modal.Header>
                <Modal.Title id="discard-modal">
                    {!(props.section === "Forum") ? "Are you sure you want to change page?" :
                        "Are you sure you want to go back to the Forum?"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {props.section==="Forum" && props.comment && !props.edit && !props.changed && "You were typing a comment and if you go back you will lose it."}
                        {props.section!=="Forum" && props.comment && !props.edit && !props.changed && "You were typing a comment and if you change page you will lose it."}
                        {!props.comment && !props.val && !props.edit && !props.changed && "All insertions (text, tags) will be lost."}
                        {!props.comment && props.val && !props.edit && !props.changed &&  "Any changes to the existing post will not be applied."}
                        {props.section==="Forum" && !props.comment && props.edit && props.changed && "You were editing a comment and if you go back you will lose the changes."}
                        {props.section!=="Forum" && !props.comment && props.edit && props.changed && "You were editing a comment and if you change page you will lose the changes."}
                        {props.section==="Forum" && props.comment && props.edit && props.changed && "You were both typing a comment and editing a comment, if you go back you will lose everything."}
                        {props.section!=="Forum" && props.comment && props.edit && props.changed && "You were both typing a comment and editing a comment, if you change page you will lose everything."}
                        {props.section==="Forum" && props.comment && props.edit && !props.changed && "You were typing a comment and if you go back you will lose it."}
                        {props.section!=="Forum" && props.comment && props.edit && !props.changed && "You were typing a comment and if you change page you will lose it."}
{/*                         {(props.section === "Forum" ?
                            (props.comment ?
                                "You were typing a comment and if you go back you will lose it." :
                                (!props.val ? "All insertions (text, kind of post, topics) will be lost." :
                                    "Any changes to the existing post will not be applied."))
                            : (props.comment ? "You were typing a comment and if you change page you will lose it."
                                : (!props.val ? "All insertions (text, kind of post, topics) will be lost."
                                    : "Any changes to the existing post will not be applied.")))} */}</Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-0" size="sm" variant="secondary" onClick={() => props.setmd(false)}>{!(props.section === "Forum") ? "No, don't change" :
                    "No, don't go back"}</Button>
                <Button size="sm" className="mr-0" variant="danger" onClick={() => {
                    switch (props.section) {
                        case "Home":
                            props.setGoToHome(true);
                            props.setGoToForum(false);
                            props.setGoToProfile(false);
                            props.setGoToGuide(false);
                            break;
                        case "Profile":
                            props.setGoToHome(false);
                            props.setGoToForum(false);
                            props.setGoToProfile(true);
                            props.setGoToGuide(false);
                            break;
                        case "Guide":
                            props.setGoToHome(false);
                            props.setGoToForum(false);
                            props.setGoToProfile(false);
                            props.setGoToGuide(true);
                            break;
                        case "Forum":
                            props.setFromHome(false);
                            props.setActiveFilter([]);
                            props.setActiveSort('newest');
                            props.setSearching(false);
                            props.setTextSearching('');
                            props.setSearchedPosts([]);
                            props.setShowPostDetails(false);
                            props.setPostDetails(undefined);
                            props.setNewPost(false);
                            props.setShowfiltermodal(false);
                            props.setIV({ val: false });
                            props.setText('');
                            props.setType('');
                            props.setMainT('');
                            props.setSelectedTags([]);
                            props.setPublished(false);
                            props.setEdited(false);
                            props.setDeleted(false);
                            props.setEditedDetails(false);
                            props.setComment(false);
                            props.reset();
                            props.setEdit(false);
                            props.setChanged(false);
                            props.resetEditText();
                            props.setNow(0);
                            props.setDirty(true);
                            props.setLoading(true);
                            props.setLoadingArray([true]);
                            props.setmd(false);
                            props.resetForm();
                    }
                }}>{!(props.section === "Forum") ? "Yes, change" :
                    "Yes, go back"}</Button>
            </Modal.Footer>
        </Modal>)
}

export default ModalDiscardNavbar;