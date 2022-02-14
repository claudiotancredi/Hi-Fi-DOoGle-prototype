import { Row, Form, Col } from 'react-bootstrap';

function GuideSearchBar(props) {
    const handleChange = (event)=>{
        const text = event.target.value.toLowerCase();
        if (text!==""){
            props.setSearching(true);
            props.setTextSearching(text);
            props.setSearchedCategories(() =>props.allCategories.filter((c)=>c.name.includes(text)));
        }
        else{
            props.setSearching(true);
            props.setTextSearching("");
            props.setSearchedCategories(props.allCategories);
        }
    }

    function onKeyDown(keyEvent) {
        if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
            keyEvent.preventDefault();
        }
    }

    return (
            <Form onKeyDown={onKeyDown} className="mb-2 mx-auto" inline={true} action="#" aria-label="Quick search" role="search" id="search">
                <Form.Control disabled={props.loading} onSelect={handleChange}  autoComplete="off" value={props.textSearching} onChange={handleChange} id="searchBar" as="input" type="search" placeholder="Search for a category or an article" aria-label="Search query" />
            </Form>
        )
}

export default GuideSearchBar;