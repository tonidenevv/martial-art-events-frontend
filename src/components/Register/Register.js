import { useState } from "react";
import * as userService from '../../services/userService';

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues(old => ({ ...old, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsArr = [
            (values.username.length < 5 || values.username.length > 15),
            (values.password.length < 5 || values.password.length > 15),
            (values.password !== values.confirmPassword)
        ];

        setErrors({
            username: errorsArr[0],
            password: errorsArr[1],
            confirmPassword: errorsArr[2],
        });

        if (!errorsArr.some(x => x === true)) {
            userService.register({ username: (values.username).toLowerCase(), password: values.password, confirmPassword: values.confirmPassword })
                .then(res => {
                    if (res.message) {
                        setErrors({ serverError: res.message });
                    } else {
                        console.log(res)    
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <>
            <h3 className="text-center">Register</h3>
            <div className="container align-items-center d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        {errors.serverError && <div style={{ color: 'red' }}>{errors.serverError}</div>}
                        {errors.username && <div style={{ color: 'red' }}>Username should be between 5 and 15 characters</div>}
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
                    <div className="mb-3">
                        {errors.password && <div style={{ color: 'red' }}>Password should be between 5 and 15 characters</div>}
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password..."
                            onChange={handleChange}
                            value={values.password}
                        />
                    </div>
                    <div className="mb-3">
                        {errors.confirmPassword && <div style={{ color: 'red' }}>Passwords don't match</div>}
                        <input
                            type="password"
                            className="form-control"
                            id="confirm-password"
                            name="confirmPassword"
                            placeholder="Confirm password..."
                            onChange={handleChange}
                            value={values.confirmPassword}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </form>
            </div></>
    )
}
export default Register;