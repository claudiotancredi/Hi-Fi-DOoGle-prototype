import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import API from "../API";

function FurtherHelp(props) {

    const [tag, setTag] = useState([]);
    const [dirty, setDirty] = useState(true);

    useEffect(() => {
        const getTags = () => {
            if (dirty && props.allCategories.length > 0) {
                let upperkat = props.allCategories.filter(c => c.id == props.activeSubcategory.catID && c.catID == undefined)[0]
                API.getAllTags()
                    .then(t => {
                        setTag(t.filter(f => f.tag.toLowerCase() === upperkat.name || f.tag.toLowerCase() === props.activeSubcategory.name.toLowerCase()))
                    })
                    .catch(() => setTag([]))
                    .finally(() => { setDirty(false); })
            }
        }
        getTags();

    }, [dirty])

    return (
        <>
            <Row className="furtherhelp2">
                <span >Need further help? Check what people say <Link to={{ pathname: '/forum', state: { subcategory: tag } }} >about {props.activeSubcategory.name}!</Link></span>
            </Row>
        </>
    )
}

export default FurtherHelp;