import { Row, Form, Col } from 'react-bootstrap';

function ForumSearchBar(props) {

    const handleChange = (event) => {
        const text = event.target.value.toLowerCase();
        if (text !== "") {
            props.setSearching(true);
            props.setTextSearching(text);
            props.setSearchedPosts(() => props.posts.filter((c) => c.text.includes(text)))
            props.setLoading(true);
        }
        else {
            props.setSearching(false);
            props.setTextSearching("");
            props.setSearchedPosts([]);
            props.setLoading(true);
        }
    }

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (
        <Form onKeyDown={onKeyDown} className="mb-2 mx-auto" inline={true} action="#" aria-label="Quick search" role="search">
            <Form.Control autoComplete="off" value={props.textSearching} onChange={handleChange} as="input" type="search" placeholder="Search in posts' text" aria-label="Search query" className="py-0" />
        </Form>
    )
}

export default ForumSearchBar;