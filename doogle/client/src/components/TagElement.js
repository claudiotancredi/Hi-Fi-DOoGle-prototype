import { Badge} from 'react-bootstrap';

function TagElement(props) {
return (
    <div><Badge pill className="mb-2 mr-1 pilltag" variant="secondary">{props.tag}</Badge></div>
)
}
export default TagElement;