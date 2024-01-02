import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import * as eventService from '../../services/eventService';
import { useNavigate } from "react-router-dom";
import Event from "../Events/Event/Event";

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        if (!auth?.token) {
            navigate('/login');
        } else {
            eventService.getOwnedById(auth?._id)
                .then(res => {
                    setIsLoading(false);
                    setEvents(res)
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
                    {events.length > 0 ? <div className="row">{events.map(x => <Event key={x._id} event={x} />)}</div> : <h6>No created events..</h6>}
                </div>
                <div className="card-body">
                    <h5 className="card-title">Attending</h5>
                    <div className="card" style={{ width: "18rem" }}>
                        <img src="..." className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Profile;