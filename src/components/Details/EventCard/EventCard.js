import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
    return (
        <div className="card mb-3" style={{ maxWidth: 540 }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={event.imageUrl}
                        className="img-fluid rounded-start"
                        alt={event.title}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h2 className="card-title">
                            {event.title}
                        </h2>
                        <p className="card-text fs-3">
                            Sport: {event.sport}
                        </p>
                        <p className="card-text fs-3">
                            Description: {event.description}
                        </p>
                        <p className="card-text fs-5">
                            Ticket Price: {event.ticketPrice}$
                        </p>
                        <p className="card-text">
                            Attending: {event.attending?.length}
                        </p>
                        <Link className="btn btn-warning m-4" to={`/events/${event._id}/edit`} role="button">Edit</Link>
                        <Link className="btn btn-danger" to={`/events/${event._id}/delete`} role="button">Delete</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard;