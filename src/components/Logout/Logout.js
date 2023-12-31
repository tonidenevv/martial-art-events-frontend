import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import * as userService from '../../services/userService';
import { Navigate } from "react-router-dom";

const Logout = ({ handleLogout }) => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    let token = auth?.token;

    if (token) {
        userService.logout(token)
            .then(res => {
                if (res.message === 'Successfully logged out') {
                    handleLogout();
                    navigate('/', { replace: true });
                }
            });
    } else {
        return <Navigate to="/login" replace={true} />
    }
}

export default Logout;