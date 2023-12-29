import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container text-center">
            <div className="row align-items-center">
                <div className="col">
                    <img src="images/martial-arts.png" className="img-fluid" alt="Martial Arts" />
                </div>
                <div className="col">
                    <h1>The Home to Martial Art Events</h1>
                    <p className="lead">
                        All events in the Martial Arts World. Boxing, Wrestling, MMA, Kickboxing, you name it.. it's all here!
                    </p>
                    <Link className="btn btn-primary" to="/events" role="button">View All Events</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;