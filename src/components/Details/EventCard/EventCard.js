import { Link, useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import * as eventService from '../../../services/eventService';
import { useState } from "react";

const EventCard = ({ event }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setIsLoading(true);
        eventService.del(id)
            .then(() => {
                setIsLoading(false);
                navigate('/events');
            })
            .catch(err => console.log(err));
    }
    return (
        isLoading
            ? <div className="d-flex justify-content-center">
                < div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }
                } role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div >
            </div >
            : <>
                <Modal event={event} handleDelete={handleDelete} />
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
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default EventCard;