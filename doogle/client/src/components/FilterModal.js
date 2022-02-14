import { useEffect, useState } from 'react';
import { Modal, Button, Row, Container, Form } from 'react-bootstrap';
import API from '../API';

function FilterModal(props) {

    const [kind, setKind] = useState((props.activeFilter.filter((f) => f.tag === "Advice" || f.tag === "Question").length > 0 &&
        props.activeFilter.filter((f) => f.tag === "Advice" || f.tag === "Question")[0].tag) || "Nothing in particular");
    const [expert, setExpert] = useState(props.activeFilter.filter((f) => f.tag === "Expert").length > 0 &&
        props.activeFilter.filter((f) => f.tag === "Expert")[0].tag === "Expert" ? "Yes" : "No");
    const [tags, setTags] = useState([]);
    const [dirty, setDirty] = useState(true);
    const [af, setAf] = useState(props.activeFilter.filter((f) => f.tag !== "Expert" && f.tag !== "Advice" && f.tag !== "Question"));

    const equals = (a, b) => {
        return a.length === b.length &&
            a.every((v, i) => v === b[i]);
    }

    useEffect(() => {
        const getTags = () => {
            if (dirty) {
                API.getAllTags()
                    .then(t => setTags(t))
                    .catch(() => setTags([]))
                    .finally(() => { setDirty(false); })
            }
        }
        getTags();

    }, [dirty])

    return (<>
        <Modal
            backdrop="static"
            animation={false}
            onHide={() => props.setShowfiltermodal(false)}
            show={props.showfiltermodal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Filters
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Row>
                            <Form.Group controlId="KindForm">
                                <Form.Label>What type of posts are you looking for? (<i>Advice/Question</i>)</Form.Label>
                                <Form.Control as="select" value={kind} onChange={(event) => setKind(event.target.value)}>
                                    <option>Nothing in particular</option>
                                    <option>Advice</option>
                                    <option>Question</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="UserForm">
                                <Form.Label>Would you like to see only posts of experts?</Form.Label>
                                <Form.Control as="select" value={(expert === "Expert" || expert === "Yes") ? "Yes" : "No"} onChange={(event) => setExpert(event.target.value)}>
                                    <option>No</option>
                                    <option>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="cat">
                                <Form.Label>Tap one or more tags you want to filter by. Only posts that have one of the selected tags will be shown.</Form.Label>
                                {tags.filter((f) => f.parentTag === undefined && f.tag !== "Expert" && f.tag !== "Advice" && f.tag !== "Question").map(t => (<Button className="mr-1 mb-1" key={t.ID} id={t.ID} onClick={(event) => {
                                    let flag = false;
                                    af.forEach((f) => { if (f.tag === event.target.textContent) flag = true })
                                    if (flag === false) {
                                        setAf(actf => [...actf, tags.filter(g => g.tag === event.target.textContent)[0]])
                                    }
                                    else {
                                        setAf(actf => actf.filter(g => g.tag !== event.target.textContent))
                                        setAf(actf => actf.filter(g => g.parentTag !== tags.filter(h => h.tag === event.target.textContent)[0].ID))
                                    }
                                }}
                                    variant={af.filter((f) => f.tag === t.tag)[0] !== undefined ? 'primary' : 'light'}>{t.tag}
                                </Button>))}
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            {
                                tags.filter((f) => f.parentTag !== undefined && af.filter((t) => t.ID === f.parentTag).length > 0).length > 0 && (
                                    <>
                                        <Form.Group controlId="subcat">
                                            <Form.Label>Tap one or more subtags you want to filter by. Each subtag will further filter the posts with the corresponding tag.</Form.Label>
                                            {tags.filter((f) => f.parentTag !== undefined && af.filter((t) => t.ID === f.parentTag).length > 0).map((t) => (
                                                <Button className="mr-1 mb-1" key={t.ID} id={t.ID} onClick={(event) => {
                                                    let flag = false;
                                                    af.forEach((f) => { if (f.tag === event.target.textContent) flag = true })
                                                    if (flag === false) {
                                                        setAf(actf => [...actf, tags.filter(g => g.tag === event.target.textContent)[0]])
                                                    }
                                                    else {
                                                        setAf(actf => actf.filter(g => g.tag !== event.target.textContent))
                                                    }
                                                }}
                                                    variant={af.filter((f) => f.tag === t.tag)[0] !== undefined ? 'primary' : 'light'}>
                                                    {t.tag}
                                                </Button>))}
                                        </Form.Group>
                                    </>)
                            }

                        </Form.Row>
                        {/*                         <Form.Row>
                            <Form.Label>
                                Example: you choose to see advices coming from experts and you decide to apply "Food", "Kibble" and "Toys". You will see only posts marked as "Expert" and "Advice" that include at least one of the selected categories/subcategories ("Food", "Kibble", "Toys").
                            </Form.Label>
                        </Form.Row> */}
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.setShowfiltermodal(false)}>Cancel</Button>
                <Button variant="success" onClick={() => {
                    let v = af;
                    if (kind !== "Nothing in particular") {
                        v.push(tags.filter(t => t.tag === kind)[0])
                    }
                    if (expert === "Yes") {
                        v.push(tags.filter(t => t.tag === "Expert")[0])
                    }
                    {/*
                        console.log(v)
                        console.log(props.activeFilter)
                    */}
                    if (!equals(v, props.activeFilter)) {
                        props.setActiveFilter(() => {
                            return v;
                        });
                        props.setNow(0);
                        props.setDirty(true);
                        props.setLoading(true);
                        props.setLoadingArray([true]);
                    }
                    props.setShowfiltermodal(false)
                }}>Apply</Button>
            </Modal.Footer>
        </Modal>
    </>)
}

export default FilterModal;