import { Button, FormControl, Image, Col } from 'react-bootstrap';
import commentIcon from "../myicons/send-comment.png";


function CommentBox(props) {

    const enableCommentButton = () => {
        return (props.commentValue ? false : true);
    }

    const changeCommentButtonStyle = () => {
        return (props.commentValue ? "comments-button-enabled" :
            "comments-button-disabled");
    }

    return (<>
        <div className="comments-box">
           
            <FormControl disabled={props.loading || props.loadingArray.some(e=>e===true)} size="lg" onKeyPress={props.enterCommentLine} value={props.commentValue}
                 onChange={props.handleCommentValue}
                type="text" placeholder="Add a comment..." />
    
            <Button onClick={props.submitCommentLine} variant="light" type="submit" className="sendButton"
                 id={changeCommentButtonStyle()}
                disabled={enableCommentButton()}>
                    <Image src={commentIcon} style={{ width: '2rem' }}/>
                </Button>
        </div>
    </>)
}

export default CommentBox;