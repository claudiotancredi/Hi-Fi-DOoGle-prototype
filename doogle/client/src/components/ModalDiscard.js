import { Modal, Container, Row, Button } from 'react-bootstrap';

function ModalDiscard(props) {
    return (
        <Modal
            variant="danger"
            onHide={() => props.setShowModalDiscard(false)}
            show={props.showModalDiscard}
            size="lg"
            aria-labelledby="discard-modal"
            centered
            backdrop="static"
            animation={false}
        >
            <Modal.Header>
                <Modal.Title id="discard-modal">
                    {props.t}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {!props.val ? "All insertions (text, tags) will be lost." :
                            "Any changes to the existing post will not be applied."}</Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-0" size="sm" variant="secondary" onClick={() => props.setShowModalDiscard(false)}>{props.t1}</Button>
                <Button size="sm" className="mr-0" variant="danger" onClick={() => {
                    props.setEditedDetails(false);
                    props.setEdited(false);
                    if (props.setPublished !== undefined) {
                        props.setPublished(false);
                    }
                    if (props.fromHome!==undefined){
                        props.setGoToForum(false);
                        props.setGoToGuide(false);
                        props.setGoToProfile(false);
                        props.setGoToHome(true);
                    }
                    props.setDeleted(false);
                    props.setIV({ val: false });
                    props.setShowModalDiscard(false);
                    props.resetForm();
                    props.setNewPost(false);
                    props.setNow(0);
                    props.setDirty(true);
                    props.setLoading(true);
                    props.setLoadingArray([true]);
                }}>{props.t2}</Button>
            </Modal.Footer>
        </Modal>)
}

export default ModalDiscard;