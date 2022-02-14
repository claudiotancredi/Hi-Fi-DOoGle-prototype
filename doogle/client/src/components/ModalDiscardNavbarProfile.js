import { Modal, Container, Row, Button } from 'react-bootstrap';

function ModalDiscardNavbarProfile(props) {
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
                    {!(props.section === "Profile") ? "Are you sure you want to change page?" :
                        "Are you sure you want to go back to the Profile page?"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {props.section === "Profile" && props.comment && !props.edit && !props.changed && "You were typing a comment and if you go back you will lose it."}
                        {props.section !== "Profile" && props.comment && !props.edit && !props.changed && "You were typing a comment and if you change page you will lose it."}
                        {!props.comment && !props.val && !props.edit && !props.changed && "All insertions (text, tags) will be lost."}
                        {!props.comment && props.val && !props.edit && !props.changed && "Any changes to the existing post will not be applied."}
                        {props.section === "Profile" && !props.comment && props.edit && props.changed && "You were editing a comment and if you go back you will lose the changes."}
                        {props.section !== "Profile" && !props.comment && props.edit && props.changed && "You were editing a comment and if you change page you will lose the changes."}
                        {props.section === "Profile" && props.comment && props.edit && props.changed && "You were both typing a comment and editing a comment, if you go back you will lose everything."}
                        {props.section !== "Profile" && props.comment && props.edit && props.changed && "You were both typing a comment and editing a comment, if you change page you will lose everything."}
                        {props.section === "Profile" && props.comment && props.edit && !props.changed && "You were typing a comment and if you go back you will lose it."}
                        {props.section !== "Profile" && props.comment && props.edit && !props.changed && "You were typing a comment and if you change page you will lose it."}
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
                <Button className="mr-0" size="sm" variant="secondary" onClick={() => props.setmd(false)}>{!(props.section === "Profile") ? "No, don't change" :
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
                            props.setMyPosts(false);
                            props.setFavorites(false);
                            break;
                        case "Guide":
                            props.setGoToHome(false);
                            props.setGoToForum(false);
                            props.setGoToProfile(false);
                            props.setGoToGuide(true);
                            break;
                        case "Forum":
                            props.setGoToHome(false);
                            props.setGoToForum(true);
                            props.setGoToProfile(false);
                            props.setGoToGuide(false);
                    }
                }}>{!(props.section === "Profile") ? "Yes, change" :
                    "Yes, go back"}</Button>
            </Modal.Footer>
        </Modal>)
}

export default ModalDiscardNavbarProfile;