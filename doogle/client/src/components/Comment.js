import { Card, Row, Col, Button, Container, Modal, Form, Badge, Image } from 'react-bootstrap'
import '../mycss/custom.css';
import API from '../API';
import { useState, useEffect } from 'react';
import editIcon from "../myicons/edit.png";
import trashIcon from "../myicons/trash-bin.png";
import commentIcon from "../myicons/send-comment.png";
import undoIcon from "../myicons/reset.png";


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
                    Are you sure you want to delete this comment?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>The comment will be permanently deleted and could not be restored in future.</Row>
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

function Comment(props) {

    const [commentuser, setCommentuser] = useState({ name: "", expert: "", icon: "" });
    const [edit, setEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [txt, settxt] = useState(props.editText);

    const handleEditText = (e) => {
        props.setEditText(e.target.value);
    };

    const enterCommentLine = (e) => {
        if (e.charCode === 13) {
            API.modifyComment(props.ID, props.editText).then(() => { props.setDeleted(false); props.setEditedDetails(false); props.setFlagCommented(false); props.setEdited(true); props.setDirty(true); props.setEdit(false); setEdit(false) })
            props.resetEditText();
        }
    };

    const handleDelete = () => {
        API.DeleteCommentById(props.ID, props.postID).then(() => { props.setEditedDetails(false); props.setFlagCommented(false); props.setEdited(false); props.setDeleted(true); props.setEdit(false); props.setChanged(false); props.setDirty(true); })
    }


    useEffect(() => {
        const getCommentUser = () => {
            if (props.dirty || commentuser.name === "") {
                API.getUserInfo(props.userID)
                    .then(u => setCommentuser(u))
                    .catch(() => setCommentuser())
                    .finally(() => { props.setDirty(false); props.setLoadingArray(la=>la.map((l, i)=>{if (i===props.index) return false; else return l;}))})
            }
        }
        getCommentUser();
    }, [props.dirty])

    useEffect(() => {
        const getet = () => {
            settxt(props.text);
            if (edit){
                if (txt!==props.editText){
                    props.setChanged(true);
                }
                else{
                    props.setChanged(false);
                }
            }
        }
        getet();
    }, [props.editText.length])

    return (<>
    {!props.loading && !props.loadingArray.some(l=>l===true) && <>
        <Card className={"commentwidth mt-1 " + (props.loggedUser === props.userID ? "commentpositionright" : "commentpositionleft")}>
            <Row>
                <Card.Img
                    variant="top"
                    src={commentuser.icon}
                    className="im ml-4 mt-2 mr-1"
                />
                <Card.Text className="mt-2 mr-1">{commentuser.name}
                    {commentuser.expert && (<Badge className="expert2 ml-1" variant="success">Expert</Badge>)}</Card.Text>
                {props.loggedUser === props.userID ?
                    <Button disabled={!edit && props.edit} className="mr-1" variant="light" onClick={() => { if (!props.edit){props.setEditText(props.text); props.setEdit(true); setEdit(true);} 
                    else{
                        props.setChanged(false); 
                        props.setEdit(false); 
                        setEdit(false);
                        props.resetEditText();
                    } }}>
                        {(props.edit && !edit)||(!props.edit && !edit) ?<img
                            alt=""
                            src={editIcon}
                            className="im"
                        />:<img alt="" src={undoIcon} className="im"/>}
                    </Button>
                    : <></>}
                {props.loggedUser === props.userID ?
                    <Button variant="light" onClick={() => setShowModalDelete(true)}>
                        <img
                            alt=""
                            src={trashIcon}
                            className="im"
                        />
                    </Button>
                    : <></>}
            </Row>
            {!edit ? <Card.Text as={Row} className="comments">
                {props.text}
            </Card.Text> : <Row><Col xs="10"><Form><Form.Control autoComplete="off" className="textareadisableresize" as="textarea" rows={Math.ceil(props.text.length/22)} onKeyPress={enterCommentLine} value={props.editText}
                onChange={handleEditText}
                type="text" /></Form></Col>
                <Col className="sendcommentedit" xs="1"><Button onClick={() => {
                    API.modifyComment(props.ID, props.editText).then(() => { props.setChanged(false); props.setDeleted(false); props.setEditedDetails(false); props.setFlagCommented(false); props.setEdited(true); props.setDirty(true); props.setEdit(false); setEdit(false) })
                    props.resetEditText();
                }} variant="light" type="submit" className="sendButton"
                    id={"sendeditcomment"}
                    disabled={props.editText === "" || !props.changed}>
                    <Image src={commentIcon} style={{ width: '1rem' }} />
                </Button></Col></Row>}
        </Card>
        {showModalDelete && <ModalDelete  handleDelete={handleDelete} setShowModalDelete={setShowModalDelete} showModalDelete={showModalDelete} />}

    </>}</>
    )
}
export default Comment;