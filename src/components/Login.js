import { useEffect, useState } from "react";
import { LOGIN_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";


const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const loginData = {username, password};

        postData(loginData);
    }

    const postData = async (data) => {
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(data)
            });

            const jsonResponse = await response.json();

            if(response?.status >= 200 && response?.status < 300) {
                dispatch(login(jsonResponse?.body));
                navigate("/");
            } else {
                setErrorMessage(jsonResponse?.message);
            }

        } catch (error) {
            console.log(error);
        }
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
                {errorMessage !== "" && <p className="error-content">{errorMessage}</p>}
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
};

export default Login;