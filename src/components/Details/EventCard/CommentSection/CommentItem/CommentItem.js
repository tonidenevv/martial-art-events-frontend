const CommentItem = ({ comment }) => {
    return (
        <div className="card-body">
            <blockquote className="blockquote mb-0">
                <p>{comment}</p>
            </blockquote>
        </div>
    )
}

export default CommentItem;