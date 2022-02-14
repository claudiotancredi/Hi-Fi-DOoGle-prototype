import { Modal, Container, Row, Button } from 'react-bootstrap';

function ModalDelete(props) {
    return (<>
        <Modal
            variant="danger"
            onHide={() => props.setShowModalDelete(false)}
            show={props.showModalDelete}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            animation={false}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete this post?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>The post will be permanently deleted and could not be restored in the future.</Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShowModalDelete(false)}>No, don't delete it</Button>
                <Button variant="danger" onClick={() => {
                    props.handleDelete();
                    props.setShowModalDelete(false);
                }}>Yes, delete it</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ModalDelete;