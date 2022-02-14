import PostProfile from "./PostProfile";
import { CardColumns, Button, Row } from 'react-bootstrap';
import { Line } from 'rc-progress';

function ListOfPostsProfile(props) {

    return (<>
        {!props.loading && <><CardColumns>
            {
                props.posts.map((p, index, array) => {
                    return (<div key={p.ID}><PostProfile
                    loadingArray={props.loadingArray}
                    index={index}
                        setLoadingArray={props.setLoadingArray}
                        setLoading={props.setLoading}
                        setDirtyDetails={props.setDirtyDetails} ID={p.ID} author={p.author}
                        setShowPostDetails={props.setShowPostDetails} setPostDetails={props.setPostDetails}
                        text={p.text} likes={p.likes} dislikes={p.dislikes} ups={p.ups} comments={p.comments}

                        loggedUser={props.loggedUser}
                        typeuser={props.typeuser}
                        nameuser={props.nameuser}

                        dirty={props.dirty} setDirty={props.setDirty} now={props.now} setNow={props.setNow}
                        setPosts={props.setPosts}
                        setNewPost={props.setNewPost}
                        setIV={props.setIV}
                        setEdited={props.setEdited} setDeleted={props.setDeleted} setEditedDetails={props.setEditedDetails}
                    /> 
                    </div>
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
    </>)

}

export default ListOfPostsProfile;