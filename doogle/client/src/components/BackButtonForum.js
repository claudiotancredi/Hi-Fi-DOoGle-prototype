import backButtonIcon from "../myicons/back-button.png";
import ModalDiscard from './ModalDiscard';
import ModalDiscardComment from "./ModalDiscardComment";
import React, { useState, useEffect } from 'react';

function BackButtonForum(props) {

  const [md, setmd] = useState(false);
  const [mdec, setmdec] = useState(false);
  const [mdcombined, setmdcombined] = useState(false);

  const equals = (a, b) =>{
  return a.length === b.length &&
  a.every((v, i) => v === b[i]);
  }

  const handleClick = () => {
    if (props.fromHome===true && props.newPost && !props.showPostDetails){
      if ((!props.IV.val && props.text === "" && props.type === "" && props.selectedTags.length === 0 && props.mainT === "") ||
        (props.IV.val && props.text===props.initialText && props.mainT===props.initialMainT && props.type===props.initialType && equals(props.selectedTags, props.initialSelectedTags))) {
          props.setGoToHome(true);
      props.setGoToGuide(false);
      props.setGoToForum(false);
      props.setGoToProfile(false);
      }
      else {
        props.setShowModalDiscard(true);
      }
      return;
    }
    else{
      props.setFromHome(false);
    }
    if (!props.newPost && props.showPostDetails) {
      if (props.commentValue==="" && !props.changed){
        props.setEditedDetails(false);
      props.setEdited(false);
      props.setPublished(false);
      props.setDeleted(false);
      props.setShowPostDetails(false);
      props.setEdit(false);
      }
      else if (props.commentValue!=="" && !props.changed){
        setmd(true);
      }
      else if (props.commentValue==="" && props.edit && props.changed){
        setmdec(true);
      }
      else if (props.changed && props.edit && props.commentValue!==""){
        setmdcombined(true);
      }
    }
    else {
      if ((!props.IV.val && props.text === "" && props.type === "" && props.selectedTags.length === 0 && props.mainT === "") ||
        (props.IV.val && props.text===props.initialText && props.mainT===props.initialMainT && props.type===props.initialType && equals(props.selectedTags, props.initialSelectedTags))) {
          props.setEditedDetails(false);
        props.setEdited(false);
        props.setPublished(false);
        props.setDeleted(false);
        props.setIV({ val: false });
        props.resetForm();
        props.setNewPost(false);
      }
      else {
        props.setShowModalDiscard(true);
      }
    }
    props.setNow(0);
    props.setDirty(true);
    props.setLoading(true);
    props.setLoadingArray([true]);
  }

  return (<>
    {(props.showPostDetails || props.newPost) &&
      <img
        alt=""
        src={backButtonIcon}
        width="40"
        height="40"
        className="d-block mt-3 mb-3"
        onClick={handleClick}
      />}
    {props.showModalDiscard &&
      <ModalDiscard
      fromHome={props.fromHome}
      setGoToHome={props.setGoToHome}
                setGoToProfile={props.setGoToProfile}
                setGoToGuide={props.setGoToGuide}
                setGoToForum={props.setGoToForum}
      t={"Are you sure you want to go back?"}
      t1={"No, don't go back"}
      t2={"Yes, go back"}
        setShowModalDiscard={props.setShowModalDiscard}
        showModalDiscard={props.showModalDiscard}
        val={props.IV.val} setIV={props.setIV} setNewPost={props.setNewPost} resetForm={props.resetForm} 
        setEdited={props.setEdited} setEditedDetails={props.setEditedDetails} setPublished={props.setPublished}
                    setDeleted={props.setDeleted}/>
    }
    {(md || mdec || mdcombined) && <ModalDiscardComment t={md? "You were typing a comment and if you go back you will lose it.":
    (mdec ? "You were editing a comment and if you go back you will lose the changes." : (mdcombined && "You were both typing a comment and editing a comment, if you go back you will lose everything."))} md={md || mdec || mdcombined} setmd={setmd} reset={props.reset} 
        setEdited={props.setEdited} setEditedDetails={props.setEditedDetails} setPublished={props.setPublished}
                    setDeleted={props.setDeleted} setShowPostDetails={props.setShowPostDetails} resetEditText={props.resetEditText}
                    setEdit={props.setEdit} setmdcombined={setmdcombined} setmdec={setmdec} setChanged={props.setChanged}/>}
  </>)
}

export default BackButtonForum;
