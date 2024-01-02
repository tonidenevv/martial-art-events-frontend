import { Link, useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import * as eventService from '../../../services/eventService';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import CommentSection from "./CommentSection/CommentSection";

const EventCard = ({ event }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [eventOwnerId, setEventOwnerId] = useState('');
    const [isAttending, setIsAttending] = useState(false);
    const [attendingCount, setAttendingCount] = useState(0);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = auth?.token;
        if (token) {
            if (auth._id === event._ownerId) {
                setEventOwnerId(event._ownerId);
                setIsOwner(true)
            }
            setIsAttending(event.attending?.some(x => x === auth._id));
            setIsUser(true);
        } else {
            setIsUser(false);
        }
        setAttendingCount(event.attending?.length);
    }, [auth?.token, auth?._id, event._id, event._ownerId, event.attending]);

    const handleDelete = (id) => {
        setIsLoading(true);
        eventService.del(id, auth.token, eventOwnerId)
            .then(() => {
                setIsLoading(false);
                navigate('/events');
            })
            .catch(err => console.log(err));
    }

    const handleAttend = (eventId, ownerId) => {
        setIsLoading(true);
        eventService.attend(eventId, ownerId, auth?.token)
            .then((res) => {
                setIsAttending(res.attending.some(x => x === auth?._id));
                setIsLoading(false)
                setAttendingCount(res.attending?.length);
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
                                    Attending: {attendingCount}
                                </p>
                                {isOwner &&
                                    <>
                                        <Link className="btn btn-warning m-3" to={`/events/${event._id}/edit`} role="button">Edit</Link>
                                        <button type="button" className="btn btn-danger m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                                    </>
                                }
                                {(isUser && !isOwner && !isAttending) && <button onClick={() => handleAttend(event._id, event._ownerId,)} type="button" className="btn btn-primary m-3">Attend</button>}
                                {(isUser && !isOwner && isAttending) && <button type="button" className="btn btn-primary m-3" disabled>Attending</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <CommentSection eventId={event._id} token={auth?.token} eventOwnerId={event._ownerId} />
            </>
    )
}

export default EventCard;