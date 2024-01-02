import { useState } from "react";
import CommentItem from "./CommentItem/CommentItem";
import * as eventService from '../../../../services/eventService';

const CommentSection = ({ eventId, token, eventOwnerId }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (comment.length < 5 || comment.length > 20) {
            setError('Comment should be between 5 and 20 characters');
        } else {
            console.log(comment);
            eventService.comment(comment, eventId, token, eventOwnerId)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            setError('');
            setComment('');
        }
    }

    return (
        <div className="row">
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className="col">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nice event..."
                    aria-label="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <div className="col">
                <button onClick={handleSubmit} type="button" className="btn btn-primary">Comment</button>
            </div>
            <CommentItem />
        </div>

    )
}

export default CommentSection;