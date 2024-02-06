import JobList from "./JobList";
import { MOST_ACTIVE_AND_OPEN_SORT_CONDITION, RECENTLY_PUBLISHED_SORT_CONDITION } from "../utils/constants";

const Home = () => {
    return (
        <div className = "container">
            <JobList key = {1} sortCondition={MOST_ACTIVE_AND_OPEN_SORT_CONDITION} />
            <JobList key = {2} sortCondition={RECENTLY_PUBLISHED_SORT_CONDITION}/>
        </div>
    );
};  

export default Home;