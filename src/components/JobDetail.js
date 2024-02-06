import { useSelector } from "react-redux";
import JobInfo from "./JobInfo";
import PlaceBid from "./PlaceBid";
import { useState } from "react";
import { BIDDER_USER_TYPE } from "../utils/constants";

const JobDetail = () => { 
    const [reRender, setReRender] = useState(false);
    const user = useSelector((store) => store.user);
    const [isJobClosed, setIsJobClosed] = useState(false);


    const reRenderHandler = () => {
        setReRender(!reRender);
    }

    const jobStatusHandler = () => {
        console.log("jobStatusHandler called");
        setIsJobClosed(true);
    }
    
    return (
        <div className="container">
            <JobInfo reRender = {reRender} jobStatusHandler = {jobStatusHandler}/>
            {user.isLoggedIn && user.user?.userType === BIDDER_USER_TYPE && !isJobClosed && <PlaceBid onReRender={reRenderHandler}/>}
        </div>
    );
};

export default JobDetail;