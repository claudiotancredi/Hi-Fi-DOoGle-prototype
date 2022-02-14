import { Modal, Container, Row, Button } from 'react-bootstrap';

function ModalDiscardComment(props) {
    return (
        <Modal
            variant="danger"
            onHide={() => {props.setmd(false); props.setmdec(false); props.setmdcombined(false); props.setChanged(false)}}
            show={props.md}
            size="lg"
            aria-labelledby="discard-modal"
            centered
            backdrop="static"
            animation={false}
        >
            <Modal.Header>
                <Modal.Title id="discard-modal">
                Are you sure you want to go back?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {props.t}</Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-0" size="sm" variant="secondary" onClick={() => {props.setmd(false); props.setmdec(false); props.setmdcombined(false)}}>No, don't go back</Button>
                <Button size="sm" className="mr-0" variant="danger" onClick={() => {
                    props.setEditedDetails(false);
                    props.setEdited(false);
                    if (props.setPublished !== undefined) {
                        props.setPublished(false);
                    }
                    props.setDeleted(false);
                    props.reset();
                    props.setmd(false);
                    props.setmdec(false);
                    props.setmdcombined(false);
                    props.setEdit(false);
                    props.setShowPostDetails(false);
                    props.setChanged(false);
                }}>Yes, go back</Button>
            </Modal.Footer>
        </Modal>)
}

export default ModalDiscardComment;