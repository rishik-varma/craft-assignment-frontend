import {Link} from 'react-router-dom'; 

const JobCard = (props) => {
    const {title, requirements} = props.data;
    const jobId = props.data.id;
    const linkToRedirect = "/jobs/" + jobId;
    
    return (
        <Link to={linkToRedirect}>
            <div className="job-card">
                <h3>{title}</h3>
                <h5>Requirements:</h5>
                <p>{requirements}</p>
            </div>
        </Link>
    );
}

export default JobCard;