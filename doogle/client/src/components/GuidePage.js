import ListOfElements from "./ListOfElements";
import GuideHeader from "./GuideHeader";
import PersonalizedNavbarGuide from "./PersonalizedNavbarGuide";
import API from "../API";
//imports needed to use state
import React, { useState, useEffect } from 'react';
import GuideSearchBar from "./GuideSearchBar";
import { Row, Col, Container } from "react-bootstrap";
import GuidePost from "./GuidePost";
import { Line } from 'rc-progress';


function GuidePage(props) {

    const [allCategories, setAllCategories] = useState([]); //includes both categories and subcategories
    const [searchedCategories, setSearchedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(props.state ? { id: 4, name: 'Essentials', image: 'http://localhost:3000/static/esse.png' } : undefined);
    const [fromHome, setFromHome] = useState(props.state ? true : false);
    const [activeSubcategory, setActiveSubcategory] = useState(undefined);
    const [dirty, setDirty] = useState(true);
    const [textAndImage, setTextAndImage] = useState(undefined);
    const [searching, setSearching] = useState(false);
    const [textSearching, setTextSearching] = useState("");
    const [skippedSubcategory, setSkippedSubcategory] = useState(false);
    const [prevCat, setPrevCat] = useState(undefined);

    const [loading, setLoading] = useState(true);
    const [dirtyAllCat, setDirtyAllCat] = useState(true);
    const [nocat, setnocat] = useState(false);
    const [now, setNow] = useState(0);

    useEffect(() => {
        const getCat = () => {
            if (dirty) {
                //show subcategories
                if (activeCategory !== undefined && activeSubcategory === undefined) {
                    API.getSubcategories(activeCategory.id)
                        .then(cat => {
                            setCategories(cat);
                        })
                        .catch(() => setCategories([]))
                        .finally(() => { setDirty(false); setNow(v => v + 50) })
                }
                //show categories
                else if (activeCategory === undefined) {
                    API.getCategories()
                        .then(cat => setCategories(cat))
                        .catch(() => setCategories([]))
                        .finally(() => { setDirty(false); setNow(v => v + 50) })
                }
                //show a guide post
                else if (activeCategory !== undefined && activeSubcategory !== undefined) {
                    API.getGuideTextAndImage(activeSubcategory.id)
                        .then(t => setTextAndImage(t))
                        .catch(() => setTextAndImage(undefined))
                        .finally(() => { setDirty(false); setNow(v => v + 50) })
                }
            }
            props.setGoToHome(false);
            props.setGoToForum(false);
            props.setGoToProfile(false);
            props.setGoToGuide(true);
        }
        getCat();
    }, [dirty]);

    useEffect(() => {
        const getAllCategories = () => {
            if (dirtyAllCat) {
                API.getAllCategories()
                    .then(cat => setAllCategories(cat))
                    .catch(() => setAllCategories([]))
                    .finally(() => { setDirtyAllCat(false); setNow(v => v + 50) })
            }
        }
        getAllCategories();
    }, [dirtyAllCat]);

    useEffect(() => {
        const setL = () => {
            if (!dirty && !dirtyAllCat) {
                console.log(allCategories)
                console.log(categories)
                setLoading(false);
                if (searching) {
                    if (searchedCategories.length === 0) {
                        setnocat(true);
                    }
                    else {
                        setnocat(false)
                    }
                }
                else {
                    setnocat(false);
                }
            }
        }
        setL();
    }, [dirty, dirtyAllCat, searching, searchedCategories.length])

    return (<>
        {activeSubcategory === undefined ?
            <>
                <Container>
                    <GuideHeader
                        setNow={setNow}
                        setGoToHome={props.setGoToHome}
                        setGoToProfile={props.setGoToProfile}
                        setGoToGuide={props.setGoToGuide}
                        setGoToForum={props.setGoToForum}
                        setLoading={setLoading}
                        fromHome={fromHome}
                        setFromHome={setFromHome}
                        setPrevCat={setPrevCat}
                        prevCat={prevCat}
                        searching={searching}
                        textSearching={textSearching}
                        setSkippedSubcategory={setSkippedSubcategory}
                        skippedSubcategory={skippedSubcategory}
                        setActiveCategory={setActiveCategory}
                        setActiveSubcategory={setActiveSubcategory}
                        setSearchedCategories={setSearchedCategories}
                        setDirty={setDirty}
                        setSearching={setSearching}
                        activeCategory={activeCategory}
                        activeSubcategory={activeSubcategory}
                        setTextSearching={setTextSearching} />
                    <Row>
                        <Col>
                            <GuideSearchBar
                                loading={loading}
                                searching={searching}
                                categories={categories}
                                textSearching={textSearching}
                                searchedCategories={searchedCategories}
                                setTextSearching={setTextSearching}
                                allCategories={allCategories}
                                setSearching={setSearching}
                                setSearchedCategories={setSearchedCategories} />
                        </Col>
                    </Row>
                </Container>
                <div className="guidepage1">
                    {!loading && !searching &&
                        <ListOfElements
                            setNow={setNow}
                            setLoading={setLoading}
                            setPrevCat={setPrevCat}
                            setTextSearching={setTextSearching}
                            setSearching={setSearching}
                            setSearchedCategories={setSearchedCategories}
                            setSkippedSubcategory={setSkippedSubcategory}
                            textSearching={textSearching}
                            activeCategory={activeCategory}
                            categories={categories}
                            setActiveSubcategory={setActiveSubcategory}
                            setActiveCategory={setActiveCategory}
                            setDirty={setDirty} />}
                    {!loading && searching && !nocat &&
                        <ListOfElements
                            setNow={setNow}
                            setLoading={setLoading}
                            setPrevCat={setPrevCat}
                            setTextSearching={setTextSearching}
                            setSearching={setSearching}
                            setSearchedCategories={setSearchedCategories}
                            setSkippedSubcategory={setSkippedSubcategory}
                            textSearching={textSearching}
                            allCategories={allCategories}
                            setSearching={setSearching}
                            setSearchedCategories={setSearchedCategories}
                            searching={searching}
                            activeCategory={activeCategory}
                            categories={searchedCategories}
                            setActiveSubcategory={setActiveSubcategory}
                            setActiveCategory={setActiveCategory}
                            setDirty={setDirty} />
                    }
                    {!loading && searching && nocat &&
                        <p className="nomatch2 centermatch2">Sorry, no categories or articles found.</p>}
                </div>
            </>
            :
            <><Container>
                <GuideHeader
                    setGoToHome={props.setGoToHome}
                    setGoToProfile={props.setGoToProfile}
                    setGoToGuide={props.setGoToGuide}
                    setGoToForum={props.setGoToForum}
                    fromHome={fromHome}
                    setFromHome={setFromHome}
                    setLoading={setLoading}
                    setPrevCat={setPrevCat}
                    prevCat={prevCat}
                    searching={searching}
                    textSearching={textSearching}
                    setSkippedSubcategory={setSkippedSubcategory}
                    skippedSubcategory={skippedSubcategory}
                    setActiveCategory={setActiveCategory}
                    setActiveSubcategory={setActiveSubcategory}
                    setSearchedCategories={setSearchedCategories}
                    setDirty={setDirty}
                    setNow={setNow}
                    setSearching={setSearching}
                    activeCategory={activeCategory}
                    activeSubcategory={activeSubcategory}
                    setTextSearching={setTextSearching} />
            </Container>
                {!loading &&
                    <GuidePost
                        activeSubcategory={activeSubcategory}
                        dirty={dirty}
                        textAndImage={textAndImage}
                        allCategories={allCategories} />
                }
            </>}
        <PersonalizedNavbarGuide
            setGoToHome={props.setGoToHome}
            setGoToProfile={props.setGoToProfile}
            setGoToGuide={props.setGoToGuide}
            setGoToForum={props.setGoToForum}
            currentPage={"guide"}
            activeCategory={activeCategory}
            setSearchedCategories={setSearchedCategories}
            setActiveCategory={setActiveCategory}
            setActiveSubcategory={setActiveSubcategory}
            setDirty={setDirty}
            setNow={setNow}
            setLoading={setLoading}
            setSearching={setSearching}
            setTextSearching={setTextSearching}
            setSkippedSubcategory={setSkippedSubcategory}
            searching={searching}
            setPrevCat={setPrevCat}
            setFromHome={setFromHome} />
        {loading &&
            <Row>
                <div className="center cont-size"><b className="aligntocenter">Loading Progress: {now}%</b><Line percent={now} strokeWidth="5" strokeColor="#ff780a" /></div>
            </Row>
        }
    </>)
}

export default GuidePage;