import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as eventService from '../../services/eventService';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Create = () => {
    const [values, setValues] = useState({
        title: '',
        sport: '',
        ticketPrice: '',
        description: '',
        imageUrl: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (!auth) navigate('/login');
    }, [auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsArr =
            [(values.title.length < 5 || values.title.length > 15),
            (values.sport.length < 2 || values.sport.length > 15),
            (values.ticketPrice < 1 || values.ticketPrice > 9999),
            (values.description.length < 5 || values.description.length > 20),
            !values.imageUrl];

        setErrors({
            title: errorsArr[0],
            sport: errorsArr[1],
            ticketPrice: errorsArr[2],
            description: errorsArr[3],
            imageUrl: errorsArr[4],
        });

        if (!errorsArr.some(x => x === true)) {
            setIsLoading(true);
            eventService.create(values, auth.token)
                .then(() => {
                    setIsLoading(false);
                    navigate('/events')
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    const handleChange = (e) => {
        setValues(old => ({ ...old, [e.target.name]: e.target.value }))
    }

    return (
        isLoading
            ? <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : <>
                <h3 className="text-center">Create an Event</h3>
                <div className="container align-items-center d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            {errors.title && <div style={{ color: 'red' }}>Title should be between 5 and 15 characters</div>}
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Title..."
                                onChange={handleChange}
                                value={values.title}
                            />
                        </div>
                        <div className="mb-3">
                            {errors.sport && <div style={{ color: 'red' }}>Sport should be between 2 and 15 characters</div>}
                            <input
                                type="text"
                                className="form-control"
                                id="sport"
                                name="sport"
                                placeholder="Sport Type..."
                                onChange={handleChange}
                                value={values.sport}
                            />
                        </div>
                        <div className="mb-3">
                            {errors.ticketPrice && <div style={{ color: 'red' }}>Ticket price should be between 1 and 9999 dollars</div>}
                            <input
                                type="number"
                                className="form-control"
                                id="ticket-price"
                                name="ticketPrice"
                                placeholder="Ticket price..."
                                onChange={handleChange}
                                value={values.ticketPrice}
                            />
                        </div>
                        <div className="mb-3">
                            {errors.description && <div style={{ color: 'red' }}>Description should be between 5 and 15 characters</div>}
                            <textarea
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                placeholder="Description..."
                                onChange={handleChange}
                                value={values.description}
                            />
                        </div>
                        <div className="mb-3">
                            {errors.imageUrl && <div style={{ color: 'red' }}>Image URL is required</div>}
                            <input
                                type="text"
                                className="form-control"
                                id="imageUrl"
                                name="imageUrl"
                                placeholder="Image URL..."
                                onChange={handleChange}
                                value={values.imageUrl}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </>
    )
}

export default Create;