import { CardColumns, Card } from 'react-bootstrap'
import API from "../API";
//imports needed to use state
import React, { useState, useEffect } from 'react';
import esse from '../myicons/esse.png';

function CategoryElement(props) {

    const [indexSubstring, setIndexSubstring] = useState(0);
    const [leng, setLeng] = useState(0);

    useEffect(() => {
        const setIndex = () => {
            if (props.textSearching !== undefined) {
                setIndexSubstring(props.category.name.indexOf(props.textSearching));
                setLeng(props.textSearching.length)
            }
        }
        setIndex();
    }, [props.textSearching.length]);

    return (<>

        <div onMouseDown={() => {
            //clicking on an element of a unfiltered list
            if (!props.searching) {
                //going to a list of subcategories
                if (props.activeCategory === undefined) {
                    props.setActiveCategory(props.category);
                    props.setNow(0);
                    props.setDirty(true);
                    props.setLoading(true);
                }
                //going to a guide post
                else {
                    props.setActiveSubcategory(props.category);
                    props.setNow(0);
                    props.setDirty(true);
                    props.setLoading(true);
                }
            }
            //clicking on an element found by search
            else {
                //clicking on a category
                if (props.category.catID === undefined) {
                    console.log("clicked on a searched category");
                    props.setActiveSubcategory(undefined);
                    props.setActiveCategory(props.category);

                    console.log("category: " + props.category.name);
                    props.setSearching(false);
                    var search = document.getElementById("search");
                    if (search !== null)
                        search.reset();
                    props.setTextSearching("")
                    props.setNow(0);
                    props.setDirty(true);
                    props.setLoading(true);
                }
                //clicking on a subcategory
                else {
                    if (props.activeCategory !== undefined) {
                        props.setPrevCat(props.activeCategory)
                    }
                    console.log("clicked on a searched subcategory");
                    if (props.activeCategory === undefined) props.setSkippedSubcategory(true);
                    console.log(props.allCategories)
                    console.log(props.allCategories.filter((c) => c.id === props.category.catID && c.catID === undefined)[0])
                    props.setActiveCategory(props.allCategories.filter((c) => c.id === props.category.catID && c.catID === undefined)[0]);
                    props.setActiveSubcategory(props.category);
                    props.setSearching(false);
                    var search = document.getElementById("search");
                    if (search !== null)
                        search.reset();
                    props.setTextSearching("")
                    props.setNow(0);
                    props.setDirty(true);
                    props.setLoading(true);
                }
                //props.setSearchedCategories([]);
                // props.setSearching(false);
            }
            //document.getElementById("searchBar").value = "";
        }}>
            <Card className="text-center ml-1 mr-2 mt-2 cat" border={props.category.name!=='Essentials' && props.category.name!=="essentials"?"primary":"warning"} style={props.category.name!=='Essentials' && props.category.name!=="essentials"?{ width: '10rem', flex: 1, margin: '5px' }:{ width: '20.8rem', flex: 1, margin: '5px' }}>
                {props.searching && console.log(props.category)}
                {props.category.esse!==undefined && props.category.esse===1 && <img alt="" src={esse} width="25" heigth="25" className="topright"/>}
                <img
                    alt=""
                    src={props.category.image}
                    width="70"
                    height="70"
                    className="mx-auto d-block mb-2 mt-2"
                />
                {!props.searching || props.textSearching === "" ? <Card.Title>{props.category.name.charAt(0).toUpperCase() + props.category.name.slice(1)}</Card.Title> :
                    <Card.Title>
                        <span>

                            {props.category.name.slice(0, indexSubstring).charAt(0).toUpperCase() + props.category.name.slice(1, indexSubstring)}
                        </span>
                        <span className="highlight">
                            {indexSubstring === 0 ?
                                props.category.name.slice(indexSubstring, indexSubstring + (leng)).charAt(indexSubstring).toUpperCase() + props.category.name.slice(indexSubstring + 1, indexSubstring + (leng)) :
                                props.category.name.slice(indexSubstring, indexSubstring + (leng))}
                        </span>
                        <span>
                            {props.category.name.slice(indexSubstring + (leng))}
                        </span>
                    </Card.Title>}
                    {(props.category.name==="Essentials" || props.category.name==="essentials") && <Card.Subtitle className="mb-2 mr-2 ml-2 text-muted corsivo">
                        Tap here for our selection of articles specifically chosen to help novice dog owners take care of their dogs.
                        </Card.Subtitle>}
            </Card>
        </div>
    </>)
}


function ListOfElements(props) {

    return (<>
        <CardColumns style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap" }}>
            {props.categories.map((c) => (
                <CategoryElement
                    setPrevCat={props.setPrevCat}
                    setTextSearching={props.setTextSearching}
                    setSkippedSubcategory={props.setSkippedSubcategory}
                    textSearching={props.textSearching}
                    allCategories={props.allCategories}
                    setSearching={props.setSearching}
                    setSearchedCategories={props.setSearchedCategories}
                    searching={props.searching}
                    key={c.id + c.image}
                    activeCategory={props.activeCategory}
                    setActiveSubcategory={props.setActiveSubcategory}
                    setActiveCategory={props.setActiveCategory}
                    setDirty={props.setDirty}
                    setNow={props.setNow}
                    setLoading={props.setLoading}
                    category={c} />))}
        </CardColumns>
    </>)

}

export default ListOfElements;