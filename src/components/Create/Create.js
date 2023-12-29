import { useState } from "react";

const Create = () => {
    const [values, setValues] = useState({
        title: '',
        sport: '',
        ticketPrice: '',
        description: '',
        imageUrl: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
    }

    const handleChange = (e) => {
        setValues(old => ({ ...old, [e.target.name]: e.target.value }))
    }

    return (
        <>
            <h3 className="text-center">Create an Event</h3>
            <div className="container align-items-center d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
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
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </form>
            </div>
        </>
    )
}

export default Create;