import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { FETCH_TOP_10_JOBS_URL } from "../utils/constants";

const JobList = ({sortCondition}) => {
    const title = sortCondition + "_JOBS";
    const [data, setData] = useState([]);
    const url = FETCH_TOP_10_JOBS_URL + sortCondition;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const jobs = await fetch(url);
        
        const jsonData = await jobs.json();

        setData(jsonData?.body);
    };

    return (
        <div className="job-container">
            <h4>{title}</h4>
            {data.map((jobData) => (
                <JobCard data={jobData} key = {jobData.id} />
            ))}
        </div>
    );
};

export default JobList;