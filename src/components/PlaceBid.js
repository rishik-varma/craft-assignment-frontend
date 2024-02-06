import moment from '../../node_modules/moment/src/moment';
import { useState, useEffect } from "react";
import { PLACE_BID_URL, POSTER_USER_TYPE } from "../utils/constants";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const PlaceBid = ({onReRender}) => {

    const [biddingAmount, setBiddingAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const user = useSelector((store) => store.user);
    const {jobId} = useParams();
    const navigate = useNavigate();

    if(!user.isLoggedIn || user.user?.userType === POSTER_USER_TYPE) {
        useEffect(() => {
            navigate("/");
        }, [])
    }

    const url = PLACE_BID_URL + jobId + "/bids?bidder_id=" + user.user?.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        let biddingTime = moment(new Date(), "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm");
        biddingTime += ":00";
        const bidData = {biddingTime, biddingAmount};
        
        postData(bidData);
    }

    const postData = async (data) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(data)
            });

            const jsonResponse = await response.json();
            if(response.status >= 200 && response.status<300) {
                setErrorMessage("");
                setBiddingAmount("");
                onReRender();
            }
            else {
                setErrorMessage(jsonResponse?.message);
            }

        } catch (error) {
            console.log(error);
        }
        
    };


    return (
        <div className="bid-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Bidding Amount:
                    <input type="number" name="amount" required value={biddingAmount} onChange={(e) => setBiddingAmount(e.target.value)}/>
                </label>
                {errorMessage !== "" && <p className="error-content">{errorMessage}</p>}
                <input type="submit" value="Bid"/>
            </form>
        </div>
    );
};

export default PlaceBid;