import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import * as eventService from '../../services/eventService';
import { useNavigate } from "react-router-dom";
import Event from "../Events/Event/Event";

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [attendingToEvents, setAttendingToEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (!auth?.token) {
            navigate('/login');
        } else {
            Promise.all([eventService.getOwnedById(auth?._id), eventService.getAttendingTo(auth?._id)])
                .then(res => {
                    setIsLoading(false);
                    setCreatedEvents(res[0]);
                    setAttendingToEvents(res[1]);
                })
                .catch(err => console.log(err));
        }
    }, [auth?._id, auth?.token, navigate])

    return (
        isLoading
            ? <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : <div className="card text-center">
                <h3 className="card-header">{auth?.username || 'Profile'}</h3>
                <div className="card-body">
                    <h5 className="card-title">Created Events</h5>
                    {createdEvents.length > 0 ? <div className="row">{createdEvents.map(x => <Event key={x._id} event={x} />)}</div> : <h6>No created events..</h6>}
                </div>
                <div className="card-body">
                    <h5 className="card-title">Attending</h5>
                    {attendingToEvents.length > 0 ? <div className="row">{attendingToEvents.map(x => <Event key={x._id} event={x} />)}</div> : <h6>You are not attending to any events..</h6>}
                </div>
            </div>
    )
}

export default Profile;