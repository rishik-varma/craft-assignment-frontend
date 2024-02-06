import { useState, useEffect } from "react";
import { OPEN_JOB_STATUS, POST_JOB_URL } from "../utils/constants";
import moment from '../../node_modules/moment/src/moment';
import { json, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BIDDER_USER_TYPE } from "../utils/constants";


const PostJob = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [auctionEndTime, setAuctionEndTime] = useState("");
    const [nameOfRecruiter, setNameOfRecruiter] = useState("");
    const [recruiterContact, setRecruiterContact] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const user = useSelector((store) => store.user);

    const navigate = useNavigate();

    if(!user.isLoggedIn || user.user?.userType === BIDDER_USER_TYPE) {
        useEffect(() => {
            navigate("/");
        }, [])
    }
    const url = POST_JOB_URL + user.user?.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobStatus = OPEN_JOB_STATUS;
        let auctionExpiryTime = moment(auctionEndTime, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
        auctionExpiryTime += ":00";
        const job = {title, description, requirements, auctionExpiryTime, nameOfRecruiter, recruiterContact, jobStatus};

        postData(job);
    }

    const postData = async (data) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(data)
            });

            const jsonResponse = await response.json();
            if(response.status < 200 || response.status >= 300) {
                setErrorMessage(jsonResponse?.message);
            }
            else {
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <label>
                    Description: 
                    <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </label>
                <label>
                    Requirements: 
                    <textarea name="requirements" required value={requirements} onChange = {(e) => setRequirements(e.target.value)}/>
                </label>
                <label>
                    Auction Expiry Time: 
                    <input type="datetime-local" name="auctionExpiryTime" required value={auctionEndTime} onChange={(e) => setAuctionEndTime(e.target.value)}/>
                </label>
                <label>
                    Name of Recruiter: 
                    <input type="text" name="nameOfRecuiter" required value = {nameOfRecruiter} onChange={(e) => setNameOfRecruiter(e.target.value)}/>
                </label>
                <label>
                    Recruiter Contact Info: 
                    <input type="text" name="recruiterContactInfo" value = {recruiterContact} onChange={(e) => setRecruiterContact(e.target.value)}/>
                </label>
                {errorMessage !== "" && <p className="error-content">{errorMessage}</p>}
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default PostJob;