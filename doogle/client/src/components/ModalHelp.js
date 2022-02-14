import { useEffect, useState } from 'react';
import { Modal, Button, Row, Container, Form,Badge } from 'react-bootstrap';
import uparrow from '../myicons/up-arrow.png'
import esse from '../myicons/esse.png';
import { Link } from 'react-router-dom';

function ModalHelp(props) {

    return (<>
        <Modal
            backdrop="static"
            animation={false}
            onHide={() => props.setmd(false)}
            show={props.md}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.use ? props.use === 1 ? `Welcome ${props.userInfo.name}!` : "Help" : "Help"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="px-0">
                    {props.use ? (props.use === 1 ? <><p>DOoGle app's ambitious goal is to assist both novice and experienced dog owners that need help in taking care of their dogs' needs.</p>
                        <p>In our app you will find a Guide containing the basic knowledge that all dog owners should be aware of, with an "Essentials" <img
                            alt=""
                            src={esse}
                            width="13"
                            height="13"
                        /> category specifically designed for beginners.
                        </p>
                        <p>Moreover, the Forum will allow you to interact with other users, with an accent on Experts' contributions <img
                                alt=""
                                src={uparrow}
                                width="14"
                                height="14"
                            />.</p>
                    </> : <><p>Not sure where to find the information you are looking for? Don't worry!</p>
                    <p> There are four different pages:</p>
                    <ul>
                        <li>The Home offers some shortcuts so that you can save your time and play with your dog!</li>
                        <li>The Guide offers basic knowledge about different topics that all dog owners should be aware of.</li>
                        <li>The Forum allows interacting with other users by creating new posts, comments, etc. There, more emphasis is placed on
                            expert contributions, which should prove to be more helpful. Do you know what an "Up" <img
                                alt=""
                                src={uparrow}
                                width="14"
                                height="14"
                            /> is? It's a special like that only experts can leave!
                        </li>
                        <li>The Profile allows you to easily retrieve your posts and your favorite posts.</li>
                        </ul>
                        <p>Still having doubts? Check the <Link to={{ pathname: '/profile', state: { md:true } }} >complete help!</Link></p></>) : <></>}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.use ? props.use === 1 ? () => props.setmd(1) : () => props.setmd(2) : () => props.setmd(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default ModalHelp;