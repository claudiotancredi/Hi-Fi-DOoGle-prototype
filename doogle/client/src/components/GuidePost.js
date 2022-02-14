import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import FurtherHelp from "./FurtherHelp";

function GuidePost(props) {

    useEffect(() => {
        const setText = () => {
            if (!props.dirty) {
                props.textAndImage !== undefined ? document.getElementById("textpost").innerHTML = props.textAndImage.text : console.log("no text");
            }
        }
        setText();
    }, [props.dirty])

    return (<>
        <Card className="guidepage2">
            <img
                alt=""
                src={props.textAndImage !== undefined ? props.textAndImage.imagepost : ""}
                width="300"
                height="300"
                className="mx-auto d-block mb-2 mt-2"
            />
            <Card.Body>
                <Card.Text className="guide-post-text">
                    <span id="textpost"></span>
                </Card.Text>
                <FurtherHelp
                    activeSubcategory={props.activeSubcategory}
                    allCategories={props.allCategories} />
            </Card.Body>
        </Card>
    </>)
}

export default GuidePost;