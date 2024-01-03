import { useParams } from "react-router-dom";
import * as eventService from '../../services/eventService';
import { useEffect, useState } from "react";
import EventCard from "./EventCard/EventCard";
import { useNavigate } from "react-router-dom";

const Details = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setIsLoading(true);
        eventService.getOne(eventId)
            .then(res => {
                if (res.message) {
                    navigate('/unavailable');
                } else {
                    setIsLoading(false);
                    setEvent(res);
                }
            })
            .catch(err => console.log(err));
    }, [eventId, navigate]);

    return (
        isLoading
            ? <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : <EventCard event={event} />
    )
}

export default Details;