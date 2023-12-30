import { useEffect, useState } from 'react';
import * as eventService from '../../services/eventService';
import Event from './Event/Event';
const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        eventService.getAll()
            .then(res => {
                setIsLoading(false);
                setEvents(res);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        isLoading
            ? <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : (events ? events.map(x => <Event key={x._id} event={x} />) : <p>No events found.</p>)
    )
};

export default Events;