import { Row, Col } from 'react-bootstrap';

import BackButtonGuide from "./BackButtonGuide";

function GuideHeader(props) {
    return (<>
        <Row className={props.activeCategory===undefined || props.searching ?"guideheader":"guideheadercategory"}>
            <Col xs="2">
                {props.searching || props.activeCategory !== undefined ? <BackButtonGuide 
                setNow={props.setNow}
                setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
                fromHome={props.fromHome} setFromHome={props.setFromHome} setPrevCat={props.setPrevCat} prevCat={props.prevCat}  textSearching={props.textSearching} setSkippedSubcategory={props.setSkippedSubcategory} skippedSubcategory={props.skippedSubcategory} setActiveCategory={props.setActiveCategory} setActiveSubcategory={props.setActiveSubcategory} setLoading={props.setLoading} setSearchedCategories={props.setSearchedCategories} setDirty={props.setDirty} setSearching={props.setSearching} activeCategory={props.activeCategory} activeSubcategory={props.activeSubcategory} setTextSearching={props.setTextSearching} searching={props.searching}/> : <></>}
            </Col>
            <div className="guide-title-width">
                <span className={props.searching?"searching":"guide-title"}>{props.searching? "Searching...":"Guide"}</span>
            </div>
        </Row>
        <Row>
            {!props.searching && props.activeCategory !== undefined &&
                <div className="guide-subtitle-width">
                    <span className="guide-subtitle">{props.activeCategory.name.charAt(0).toUpperCase() + props.activeCategory.name.slice(1)}{props.activeSubcategory!==undefined?", "+props.activeSubcategory.name.charAt(0).toUpperCase() + props.activeSubcategory.name.slice(1): ""}</span>
                </div>}
        </Row>
    </>)
}

export default GuideHeader;