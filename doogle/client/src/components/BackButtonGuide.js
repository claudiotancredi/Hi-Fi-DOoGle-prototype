import backButtonIcon from "../myicons/back-button.png";

function BackButtonGuide(props) {

  const handleClick = () => {
    if (props.fromHome && !props.searching && (props.activeCategory.name==="Essentials" || props.activeCategory.name==="essentials") && props.activeSubcategory===undefined){
      props.setGoToHome(true);
      props.setGoToGuide(false);
      props.setGoToForum(false);
      props.setGoToProfile(false);
      return;
    }
    else{
      props.setFromHome(false);
    }
    //leaving from list of subcategories
    //reset the search functionality
    if (props.searching) {
      var search = document.getElementById("search");
      if (search !== null)
        search.reset();

      props.setTextSearching("");
      props.setActiveCategory(props.activeCategory);
      props.setActiveSubcategory(props.activeSubcategory);
      props.setSearchedCategories([]);
      props.setSearching(false);
      props.setNow(0);
      props.setDirty(true);
      props.setLoading(true);
    }
    else if (props.activeSubcategory === undefined) {
      var search = document.getElementById("search");
      if (search !== null)
        search.reset();

      props.setTextSearching("");

      props.setActiveCategory(undefined);
      props.setActiveSubcategory(undefined);
      props.setSearchedCategories([]);
      props.setSearching(false);
      props.setNow(0);
      props.setDirty(true);
      props.setLoading(true);
    }
    //leaving from guide post
    else {
      var search = document.getElementById("search");
      if (search !== null)
        search.reset();

      props.setTextSearching("");
      if (props.prevCat !== undefined) {
        props.setActiveCategory(props.prevCat);
        props.setPrevCat(undefined);
        props.setActiveSubcategory(undefined);
      }
      else {
        if (props.skippedSubcategory) {
          props.setActiveCategory(undefined);
          props.setActiveSubcategory(undefined);
          props.setSkippedSubcategory(false);
        }
        else {
          props.setActiveCategory(props.activeCategory);
          props.setActiveSubcategory(undefined);
        }
      }
      props.setSearching(false);
      props.setSearchedCategories([]);
      //props.setSearchedCategories([]);
      //props.setSearching(false);
      props.setDirty(true);
      props.setNow(0);
      props.setLoading(true);
    }
  }

  return (<>
    <img
      alt=""
      src={backButtonIcon}
      width="40"
      height="40"
      className="d-block mt-3 mb-3"
      onClick={handleClick}
    />
  </>)
}

export default BackButtonGuide;
