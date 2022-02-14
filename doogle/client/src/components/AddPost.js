import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Container, Form } from 'react-bootstrap';
import ModalDiscard from './ModalDiscard';

import '../mycss/custom.css';
import API from '../API'

function AddPost(props) {

    const [tags, setTags] = useState([]);
    const [dirty, setDirty] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTags = () => {
            if (dirty) {
                API.getAllTags()
                    .then(t => { setTags(t) })
                    .catch(() => setTags([]))
                    .finally(() => { setDirty(false) })
            }
        }
        getTags();
    }, [dirty])


    useEffect(() => {
        if (!dirty) {
            if (props.IV.val) {
                let IVclear = tags.filter(t => props.IV.allTags.includes(t.tag))
                props.setText(props.IV.text)
                props.setInitialText(props.IV.text)
                if (IVclear.length > 0) {
                    IVclear.filter(t => t.ID === 0 || t.ID === 1).length > 0 ? props.setType(IVclear.filter(t => { return (t.ID === 0 || t.ID === 1) })[0].tag) : props.setType('');
                    IVclear.filter(t => { return (t.parentTag === undefined && !(t.ID === 0 || t.ID === 1 || t.ID === 2)) }).length > 0 ? props.setMainT(IVclear.filter(t => { return (t.parentTag === undefined && !(t.ID === 0 || t.ID === 1 || t.ID === 2)) })[0].tag) : props.setMainT('');
                    let IVTags = []
                    IVclear.filter(t => { return (t.parentTag !== undefined && !(t.ID === 0 || t.ID === 1 || t.ID === 2)) }).forEach((t) => { IVTags.push(t.tag) })
                    props.setSelectedTags(ts => [...ts, ...IVTags])

                    IVclear.filter(t => t.ID === 0 || t.ID === 1).length > 0 ? props.setInitialType(IVclear.filter(t => { return (t.ID === 0 || t.ID === 1) })[0].tag) : props.setInitialType('');
                    IVclear.filter(t => { return (t.parentTag === undefined && !(t.ID === 0 || t.ID === 1 || t.ID === 2)) }).length > 0 ? props.setInitialMainT(IVclear.filter(t => { return (t.parentTag === undefined && !(t.ID === 0 || t.ID === 1 || t.ID === 2)) })[0].tag) : props.setInitialMainT('');
                    let IVTags2 = []
                    IVclear.filter(t => { return (t.parentTag !== undefined && !(t.ID === 0 || t.ID === 1 || t.ID === 2)) }).forEach((t) => { IVTags2.push(t.tag) })
                    props.setInitialSelectedTags(ts => [...ts, ...IVTags2])
                }
            }
        }
    }, [dirty])

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    function handleMainT(tag) {
        props.setSelectedTags([])
        props.setMainT(tag)
    }

    const equals = (a, b) => {
        return a.length === b.length &&
            a.every((v, i) => v === b[i]);
    }

    const handleClose = () => {
        props.setFromHome(false);
        /*if (text !== '' || type || mainT) { props.setShowModalDiscard(true) }
        else {*/
        console.log('Closed!')
        // resetForm()
        // props.setIV({ val: false })
        // props.setNewPost(false)
        if ((!props.IV.val && props.text === "" && props.type === "" && props.selectedTags.length === 0 && props.mainT === "") ||
            (props.IV.val && props.text === props.initialText && props.mainT === props.initialMainT && props.type === props.initialType && equals(props.selectedTags, props.initialSelectedTags))) {
            props.setEditedDetails(false);
            props.setEdited(false);
            if (props.setPublished !== undefined) {
                props.setPublished(false);
            }
            props.setDeleted(false);
            props.resetForm();
            props.setIV({ val: false });
            props.setNewPost(false);
            props.setNow(0);
            props.setDirty(true);
            props.setLoading(true);
            props.setLoadingArray([true]);
        }
        else {
            props.setShowModalDiscard(true);
        }
        /*}*/
    }

    const handleSubmit = () => {
        props.setFromHome(false);
        let actualTags = []
        let fullTags = props.selectedTags;
        if (props.mainT !== "") fullTags.unshift(props.mainT)
        if (props.type !== "") fullTags.unshift(props.type)
        if (props.typeuser === 'EXPERT') fullTags.push('Expert')
        tags.filter(t => fullTags.includes(t.tag)).forEach((t) => actualTags.push(t.ID))

        if (!props.IV.val) {
            const newPost = { author: props.loggedUser, text: props.text, tags: actualTags }
            API.addNewPost(newPost).then(() => {
                props.resetForm();
                props.setIV({ val: false });
                props.setNewPost(false); props.setNow(0); props.setDirty(true); props.setLoading(true); props.setLoadingArray([true]); if (props.setPublished !== undefined) { props.setPublished(true); } props.setDeleted(false); props.setEdited(false); props.setEditedDetails(false)
            }).catch(e => console.log(e))
        } else {
            const modifiedPost = { ID: props.IV.id, author: props.loggedUser, text: props.text, tags: actualTags }
            API.ModifyPost(modifiedPost).then(() => {
                props.resetForm();
                props.setIV({ val: false });
                props.setNewPost(false); props.setNow(0); props.setDirty(true); props.setLoading(true); props.setLoadingArray([true]); if (props.setPublished !== undefined) { props.setPublished(false); } props.setDeleted(false);
                if (!props.details) { props.setEdited(true); props.setEditedDetails(false) } else {
                    props.setEditedDetails(true);
                    props.setEdited(false)
                }
            }).catch(e => console.log(e))
        }
    }

    return (
        <Container fluid className="profile2page">
            {!props.IV.val ? <h1 className="centertextnewpost">Add a New Post!</h1> : <h1 className="centertextnewpost">Edit your Post!</h1>}
            <Form onKeyDown={onKeyDown}>

                <Form.Group className="mb-3" controlId="formText">
                    <Form.Control
                        as="textarea"
                        maxLength="200"
                        rows="6"
                        autoComplete="off"
                        value={props.text}
                        onChange={ev => props.setText(ev.target.value)}
                        placeholder="Write your post here!" />
                    <Form.Text className="text-muted">
                        Minimum length for posts is 10 characters!
                    </Form.Text>
                </Form.Group>
                {!props.IV.val ? <h4>Add some tags to your post!</h4> : <h4>Edit your post's tags!</h4>}
                <Form.Text className="text-muted mt-0 mb-2">
                    Beware: all tags are optional, but take a look at them!
                </Form.Text>
                <Form.Group controlId="postType">
                    <Form.Label>Select type of post (<i>Advice/Question</i>).</Form.Label>
                    <Form.Control
                        as="select"
                        value={props.type}
                        onChange={(ev) => props.setType(ev.target.value)}
                        autoComplete='off'>
                        <option default key="notype" id="notype"></option>
                        {
                            tags.filter((t) => { return (t.parentTag === undefined && (t.ID === 0 || t.ID === 1)) })
                                .map((t) => (
                                    <option key={t.ID} id={t.ID}>{t.tag}</option>
                                ))
                        }
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="postMainTag">
                    <Form.Label>Select topic for the post.</Form.Label>
                    <Form.Control
                        as="select"
                        value={props.mainT}
                        onChange={(ev) => handleMainT(ev.target.value)}
                        autoComplete='off'>
                        <option default key="notype" id="notype"></option>
                        {
                            tags.filter((t) => { return (t.parentTag === undefined && !(t.ID === 0 || t.ID === 1 | t.ID === 2)) })
                                .map((t) => (
                                    <option key={t.ID} id={t.ID}>{t.tag}</option>
                                ))
                        }
                    </Form.Control>
                </Form.Group>

                {(props.mainT !== undefined &&
                    props.mainT !== '' &&
                    (tags.filter((f) => f.parentTag !== undefined && tags.filter((t) => t.ID === f.parentTag)[0].tag === props.mainT).length > 0)) &&
                    <Form.Group controlId="filters">
                        <Form.Label>Tap one or more subtopics you want to <i>add to/remove from</i> the post's tags.</Form.Label>
                        {tags.filter((f) => f.parentTag !== undefined && tags.filter((t) => t.ID === f.parentTag)[0].tag === props.mainT)
                            .map((t) =>
                                <Button
                                    className="mr-1 mb-1"
                                    key={t.ID}
                                    id={t.ID}
                                    onClick={(ev) => {
                                        if (!props.selectedTags.includes(ev.target.textContent))
                                            props.setSelectedTags(actf => [...actf, ev.target.textContent])
                                        else
                                            props.setSelectedTags(actf => actf.filter(t => t !== ev.target.textContent))
                                    }}
                                    variant={props.selectedTags.includes(t.tag) ? 'primary' : 'light'}>
                                    {t.tag}
                                </Button>)}
                    </Form.Group>
                }

                <Container className="d-flex justify-content-end px-0" >
                    <Button variant="secondary" className="mx-2" onClick={handleClose}>
                        {!props.IV.val ? 'Discard' : 'Discard changes'}
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleSubmit}
                        disabled={!(props.text.length > 10) || (props.IV.val && props.text === props.initialText && props.mainT === props.initialMainT && props.type === props.initialType && equals(props.selectedTags, props.initialSelectedTags))}>
                        {!props.IV.val ? 'Publish' : 'Save Changes'}
                    </Button>
                </Container>
            </Form>
            {props.showModalDiscard &&
                <ModalDiscard
                    setLoading={props.setLoading}
                    setLoadingArray={props.setLoadingArray}
                    setDirty={props.setDirty}
                    setNow={props.setNow}
                    t={!props.IV.val ? "Are you sure you want to discard this post?" : "Are you sure you want to discard changes to the post?"}
                    t1={!props.IV.val ? "No, don't discard it" : "No, don't discard"}
                    t2={!props.IV.val ? "Yes, discard it" : "Yes, discard"}
                    setShowModalDiscard={props.setShowModalDiscard}
                    showModalDiscard={props.showModalDiscard}
                    val={props.IV.val} setIV={props.setIV} setNewPost={props.setNewPost} resetForm={props.resetForm}
                    setEdited={props.setEdited} setEditedDetails={props.setEditedDetails} setPublished={props.setPublished}
                    setDeleted={props.setDeleted} />
            }
        </Container >
    )

}

export default AddPost