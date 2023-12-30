import { Link } from 'react-router-dom';

const Event = ({ event }) => {
    return (
        <div className="card col-4" style={{ width: '18rem' }}>
            <img src={event.imageUrl} className="card-img-top" alt={event.title} />
            <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.sport}</p>
                <Link to={`/events/${event._id}`} className="btn btn-primary">Details</Link>
            </div>
        </div>
    )
};

export default Event;