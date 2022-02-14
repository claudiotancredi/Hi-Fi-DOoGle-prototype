import Post from "./Post";
import { CardColumns, Button, Container, Row } from 'react-bootstrap';
import { Line } from 'rc-progress';

function ListOfPosts(props) {

    return (<>
        {!props.loading && <><CardColumns>
            {
                props.posts.map((p, index, array) => {
                    return (
                        <Container fluid className="px-0" key={p.ID}>
                            <Post
                                loadingArray={props.loadingArray}
                                index={index}
                                setLoadingArray={props.setLoadingArray}
                                setLoading={props.setLoading}
                                setDirtyDetails={props.setDirtyDetails} ID={p.ID} author={p.author}
                                setShowPostDetails={props.setShowPostDetails} setPostDetails={props.setPostDetails}
                                text={p.text} likes={p.likes} dislikes={p.dislikes} ups={p.ups} comments={p.comments}
                                setnpFilters={props.setnpFilters}
                                loggedUser={props.loggedUser}
                                typeuser={props.typeuser}
                                nameuser={props.nameuser}

                                dirty={props.dirty} setDirty={props.setDirty} setNow={props.setNow}
                                activeFilter={props.activeFilter} textSearching={props.textSearching}
                                setSearching={props.setSearching} setSearchedPosts={props.setSearchedPosts} searching={props.searching} setPosts={props.setPosts}
                                setNewPost={props.setNewPost}
                                setIV={props.setIV}

                                setEdited={props.setEdited}
                                setPublished={props.setPublished}
                                setDeleted={props.setDeleted}
                                setEditedDetails={props.setEditedDetails}
                            />
                            {index === array.length - 1 &&
                                <Button className="space" disabled />
                            }
                        </Container>
                    )
                })
            }
        </CardColumns>
        {(props.loading || props.loadingArray.some(e => e === true)) &&
            <Row>
                <div className="center cont-size"><b className="aligntocenter">Loading Progress: {props.now.toString().split(".")[0]}%</b><Line percent={props.now} strokeWidth="5" strokeColor="#ff780a" /></div>
            </Row>
        }
        </>}
        {!props.loading && !props.loadingArray.some(e => e === true) && props.noPosts && <p className="nomatch centermatch">Sorry, no posts found.</p>}
    </>)

}

export default ListOfPosts;