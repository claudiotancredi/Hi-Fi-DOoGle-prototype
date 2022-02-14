import { Button, Row, Col, Dropdown, Badge, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import API from "../API";
import TagElement from './TagElement';

function FilterBar(props) {

    const [tags, setTags] = useState([]);
    const [dirty, setDirty] = useState(true);

    const handleRemoveTag = (event) => {
        if (!dirty && !props.dirty) {
            props.setActiveFilter(actf => actf.filter(g => g.tag !== event.target.id));
            props.setActiveFilter(actf => actf.filter(g => g.parentTag !== tags.filter(h => h.tag === event.target.id)[0].ID));
            props.setNow(0);
            props.setDirty(true);
            props.setLoading(true);
            props.setLoadingArray([true]);
        }
    }

    const removeAllFilters= ()=>{
        props.setActiveFilter([]);
        props.setNow(0);
        props.setDirty(true);
        props.setLoading(true);
        props.setLoadingArray([true]);
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

    return (
        <Container className='px-0'>
            <Row className='mx-0 align-items-center'>
                <Col xs={5} className="px-0 ">
                {props.activeFilter ? props.activeFilter.length !== 0 ?<Button disabled={props.loading || props.loadingArray.some(e=>e===true)} className="mb-2 borderbt" variant="danger" onClick={removeAllFilters}>Clear all filters</Button>: <></>:<></>}
                </Col>
                <Col>
                    <Row className='d-flex justify-content-end'>
                        <Button disabled={props.loading === true || props.loadingArray.some(l => l === true)} className="mb-2 buttonColor" onClick={props.handleShowFilter}>
                            Filters
                        </Button>
                        <p className='invisible'>a</p>
                        <Dropdown>
                            <Dropdown.Toggle as={Button} disabled={props.loading === true || props.loadingArray.some(l => l === true)} className="symbolDropdown buttonColor" >
                                Sort by
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item className={props.activeSort === "newest" ? "bgSort" : ""} onClick={() => {
                                    if (props.activeSort !== "newest") {
                                        props.setActiveSort("newest");
                                        props.setNow(0);
                                        props.setDirty(true);
                                        props.setLoading(true);
                                        props.setLoadingArray([true]);
                                    }
                                }}>Newest</Dropdown.Item>
                                <Dropdown.Item className={props.activeSort === "declikes" ? "bgSort" : ""} onClick={() => {
                                    if (props.activeSort !== "declikes") {
                                        props.setActiveSort("declikes");
                                        props.setNow(0);
                                        props.setDirty(true);
                                        props.setLoading(true);
                                        props.setLoadingArray([true]);
                                    }
                                }}>Most liked</Dropdown.Item>
                                <Dropdown.Item className={props.activeSort === "decups" ? "bgSort" : ""} onClick={() => {
                                    if (props.activeSort !== "decups") {
                                        props.setActiveSort("decups");
                                        props.setNow(0);
                                        props.setDirty(true);
                                        props.setLoading(true);
                                        props.setLoadingArray([true]);
                                    }
                                }}>Most upped</Dropdown.Item>
                                <Dropdown.Item className={props.activeSort === "deccomments" ? "bgSort" : ""} onClick={() => {
                                    if (props.activeSort !== "deccomments") {
                                        props.setActiveSort("deccomments");
                                        props.setNow(0);
                                        props.setDirty(true);
                                        props.setLoading(true);
                                        props.setLoadingArray([true]);
                                    }
                                }}>Most commented</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
            <Row className='mx-0'>
                {props.activeFilter ? props.activeFilter.length !== 0 ?<><h6 className="mr-2 mt-1">Active filters:</h6>
                    {props.activeFilter.map((t) => (<Button size="sm" disabled={props.loading || props.loadingArray.some(e=>e===true)} variant="light" className="mb-2 mr-1 borderbt" key={t.ID} id={t.tag} onClick={handleRemoveTag}>
                        {t.tag} <b>x</b></Button>))}</> : <></> : <></>}
            </Row>
        </Container >
    )

}

export default FilterBar;