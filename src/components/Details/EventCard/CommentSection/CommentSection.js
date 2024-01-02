import { useEffect, useState } from "react";
import CommentItem from "./CommentItem/CommentItem";
import * as eventService from '../../../../services/eventService';
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";

const CommentSection = ({ eventId, token, eventOwnerId }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        setIsLoading(true);
        setIsUser(!!auth?.token);
        eventService.getOne(eventId)
            .then(res => {
                setIsLoading(false);
                setIsOwner(auth?._id === res._ownerId);
                setComments(res.comments);
            });
    }, [eventId, auth?._id, auth?.token]);

    const handleSubmit = () => {
        if (comment.length < 5 || comment.length > 20) {
            setError('Comment should be between 5 and 20 characters');
        } else {
            setIsLoading(true);
            eventService.comment(comment, eventId, token, eventOwnerId)
                .then(res => {
                    setIsLoading(false);
                    setComments(old => [...old, res])
                })
                .catch(err => console.log(err));
            setError('');
            setComment('');
        }
    }

    return (
        isLoading ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <div className="row">
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {(isUser && !isOwner) &&
                    <>
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
                    </>
                }
                <div className="card mt-4">
                    <div className="card-header">Comments</div>
                    {comments.length > 0 ? comments.map((x, i) => <CommentItem key={i} comment={x} />) : <div>No comments yet...</div>}
                </div>
            </div>

    )
}

export default CommentSection;