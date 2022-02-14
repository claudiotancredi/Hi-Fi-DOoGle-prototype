import { Navbar, Container, Button, Col } from 'react-bootstrap';
import profileIcon from "../myicons/profile.png";
import guideIcon from "../myicons/guide.png";
import forumIcon from "../myicons/forum.png";
import homeIcon from "../myicons/home.png";

function PersonalizedNavbar(props) {
    return (
        <div className='navbar'>
            <Navbar bg="dark" variant="dark" fixed="bottom" >
                <Container>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "home" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "home"}
                                onClick={() => {
                                    props.setGoToHome(true);
                                    props.setGoToForum(false);
                                    props.setGoToProfile(false);
                                    props.setGoToGuide(false);
                                }}>
                                <img
                                    alt=""
                                    src={homeIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Home</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "guide" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "guide"}
                                onClick={() => {
                                    props.setGoToHome(false);
                                    props.setGoToForum(false);
                                    props.setGoToProfile(false);
                                    props.setGoToGuide(true);
                                }
                                }>
                                <img
                                    alt=""
                                    src={guideIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Guide</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "forum" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "forum"}
                                onClick={() => {
                                    props.setGoToHome(false);
                                    props.setGoToForum(true);
                                    props.setGoToProfile(false);
                                    props.setGoToGuide(false);
                                }}>
                                <img
                                    alt=""
                                    src={forumIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Forum</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                    <Col xs="3">
                        <Navbar.Brand>
                            <Button variant={props.currentPage === "profile" ? "primary" : "link outline-light"} className="notactivepage" disabled={props.currentPage === "profile"}
                                onClick={() => {
                                    props.setGoToHome(false);
                                    props.setGoToForum(false);
                                    props.setGoToProfile(true);
                                    props.setGoToGuide(false);
                                }}>
                                <img
                                    alt=""
                                    src={profileIcon}
                                    width="35"
                                    height="35"
                                    className="mb-2"
                                />
                                <h6 className="">Profile</h6>
                            </Button>
                        </Navbar.Brand>
                    </Col>
                </Container>
            </Navbar>
        </div>
    )
}
export default PersonalizedNavbar;