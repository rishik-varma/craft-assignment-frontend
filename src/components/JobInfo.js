import { useParams } from 'react-router-dom';
import { CLOSED_JOB_STATUS, FETCH_JOB_BY_ID_URL, OPEN_JOB_STATUS, UPDATE_JOB_STATUS_URL } from '../utils/constants';
import { useEffect, useState } from 'react';

const JobInfo = ({reRender, jobStatusHandler}) => {
    const {jobId}  = useParams();
    const url = FETCH_JOB_BY_ID_URL + jobId;
    const [data, setData] = useState(null);
    const [secs, setSecs] = useState(0);
    const [jobState, setJobState] = useState(OPEN_JOB_STATUS);

    useEffect(() => {
        fetchData();
    }, [reRender]);

    useEffect(() => {
        console.log("secs", secs);
        if(secs <=0 && data?.jobStatus === OPEN_JOB_STATUS) {
            console.log("updating", secs, data);
            updateJob(jobId);
        }

        if(secs <= 0) {
            return;
        }

        const timeout = setTimeout(() => {
            setSecs(secs - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secs]);

    useEffect(() => {
        if(jobState === CLOSED_JOB_STATUS) {
            jobStatusHandler();
        }

    }, [jobState]);

    const fetchData = async () => {
        const jobData = await fetch (url);
        const jsonData = await jobData.json();
        const timeRem = await jsonData?.body?.auctionExpiryTime;
        const jobStatus = await jsonData?.body?.jobStatus;
        setData(jsonData?.body);
        setSecs(getTimeDiff(timeRem));
        setJobState(jobStatus);
    };

    const getTimeDiff = (date) => {
        const currentDate = new Date();
        return Math.floor((Date.parse(date) - Date.parse(currentDate))/1000);
    }

    const getTimeStr = (diffTime) => {
        let days = Math.floor(diffTime/(24*60*60));
        diffTime -= days*24*60*60;
        let hours = Math.floor(diffTime/(60*60));
        diffTime -= hours*60*60;
        let minutes = Math.floor(diffTime/60);
        diffTime -= minutes*60;
        let secs = diffTime;

        const timeRem = days + "d " + hours + "h " + minutes + "m " + secs + "s";  
        return timeRem;
    };

    const updateJob = async (jobId) => {
        try {
        
            const data = {"id": jobId, "jobStatus": CLOSED_JOB_STATUS};
            const response = await fetch(UPDATE_JOB_STATUS_URL, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(data)
            });

            const jsonResponse = await response.json();
            const jobState = await jsonResponse?.body?.jobStatus;
            setData(jsonResponse?.body);
            setJobState(jobState);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="job-info-container">
            <p><b>Title:</b>{data?.title}</p>
            <p><b>Descritpion: </b>{data?.description}</p>
            <p><b>Requirements:</b>{data?.requirements}</p>
            <p><b>Recruiter Info:</b>{data?.nameOfRecruiter}</p>
            <p><b>Recruiter Contact Info:</b>{data?.recruiterContact}</p>
            <p><b>Number Of Bids:</b>{data?.numberOfBids}</p>
            {data?.numberOfBids > 0 && <p><b>Minimum Bid: </b>{data?.bids[0]?.biddingAmount}</p>}
            <p><b>Auction Expiry Time: </b>{data?.auctionExpiryTime}</p>
            {secs > 0 && <p><b>Time Remaining To Auction Expiry: </b>{getTimeStr(secs)}</p>}
            {secs <= 0 && <p><b>Winnner: </b>{data?.bids[0]?.bidder?.username}</p>} 
        </div>
    );
};

export default JobInfo;