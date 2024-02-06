import { useState } from "react";
import { BIDDER_USER_TYPE, POSTER_USER_TYPE, REGISTER_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/userSlice";

const Register = () => {
    const [userType, setUserType] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const registerData = {username, password, phone, userType};

        postData(registerData);
    };

    const postData = async (data) => {
        try {
            const response = await fetch(REGISTER_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(data)
            });

            const jsonResponse = await response.json();
            
            if(response?.status >= 200 && response?.status < 300) {
                dispatch(login(jsonResponse?.body));
            }

        } catch (error) {
            console.log(error);
        }

        
        navigate("/");
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </label>
                <select value={userType} onChange = {(e) => setUserType(e.target.value)}>
                    <option value="">--Choose an option--</option>
                    <option value={POSTER_USER_TYPE}>{POSTER_USER_TYPE}</option>
                    <option value={BIDDER_USER_TYPE}>{BIDDER_USER_TYPE}</option>
                </select>
                <input type="submit" value="Register"/>
            </form>
        </div>
    );
};

export default Register;