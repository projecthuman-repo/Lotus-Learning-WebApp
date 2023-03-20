import LearnersProfileTemplate from "../Learners-Profile-Template/Learners-Profile-Template.js";
import CourseInProgress from "../../components/Course-in-progress/Course-in-progress.js";
import PersonalProfile from "../../components/Personal-Profile-Components/PersonalProfile.js";
import "./CourseProgressPage.css";


/* Page is built, should look better once resizeable components are uploaded to github */

function CourseProgressPage(){
    return(
        <div className="myContainer">
            <div className="PersonalProfileContainer"><PersonalProfile /></div>
            <CourseInProgress />
        </div>
    );
}


export default function CourseProgessPage(){
    return(
        <LearnersProfileTemplate childComponent={CourseProgressPage}/>
    );
}