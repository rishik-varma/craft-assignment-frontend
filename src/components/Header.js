import { useDispatch, useSelector } from "react-redux";
import { LOGO_URL } from "../utils/constants";
import {Link} from 'react-router-dom';
import { POSTER_USER_TYPE } from "../utils/constants";
import { logout } from "../utils/userSlice";

 const Header = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="header">
            <Link to="/">
                <div className="img-container">
                    <img src={LOGO_URL} alt="Auction Logo"/>
                </div>
            </Link>
            <div className="nav-items">
                <ul>
                    {!user.isLoggedIn && <Link to="/login"><li>Login</li></Link>}
                    {!user.isLoggedIn && <Link to="/register"><li>Signup</li></Link>}
                    {user.isLoggedIn && <li>{user.user?.username}</li>}
                    {user.isLoggedIn && user.user?.userType === POSTER_USER_TYPE  && <Link to="/postJob"><li>Post Job</li></Link>}
                    {user.isLoggedIn && <button type="submit" value="Logout" onClick={() => handleLogout()}>Logout</button>}
                </ul>
            </div>
        </div>
    )

 };

 export default Header;