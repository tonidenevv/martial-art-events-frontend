import { useEffect, useState } from "react";
import * as userService from '../../services/userService';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';

const Login = ({ handleLogin }) => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth) navigate('/');

    }, [auth, navigate]);

    const handleChange = (e) => {
        setValues(old => ({ ...old, [e.target.name]: e.target.value }));
    }

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsArr = [
            (values.username.length < 5 || values.username.length > 15),
            (values.password.length < 5 || values.password.length > 15),
        ];

        setErrors({
            username: errorsArr[0],
            password: errorsArr[1],
        });

        if (!errorsArr.some(x => x === true)) {
            setIsLoading(true);
            userService.login({ username: (values.username).toLowerCase(), password: values.password })
                .then(res => {
                    setIsLoading(false);
                    if (res.message) {
                        setErrors({ serverError: res.message });
                    } else {
                        handleLogin(res);
                        navigate('/');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        isLoading
            ? <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" style={{ width: '6rem', height: '6rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            : <>
                <h3 className="text-center">Login</h3>
                <div className="container align-items-center d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            {errors.serverError && <div className="text-center" style={{ color: 'red' }}>{errors.serverError}</div>}
                            {(errors.username || errors.password) && <div className="text-center" style={{ color: 'red' }}>Wrong username or password</div>}
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Username..."
                                onChange={handleChange}
                                value={values.username}
                            />
                        </div>
                        <div className="mb-3 container">
                            <div className="row">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control col-sm"
                                    id="password"
                                    name="password"
                                    placeholder="Password..."
                                    onChange={handleChange}
                                    value={values.password}
                                />
                                <button onClick={handleShowPassword} type="button" className="btn btn-dark btn-sm col-sm-2">👁️</button>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </>
    )
}

export default Login;