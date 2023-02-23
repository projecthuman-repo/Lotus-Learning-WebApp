import WeekdayButtons from "../WeekdayButtons/WeekdayButtons";
import CourseBox from "../Course-Box/CourseBox";
import "./Course-in-progress.css";
import badgePlaceHolder from "../../Images/exampleBadge.png";
// Coded by Taylor Oxelgren

/* This should just be able to be used, but sizing modifications will be required

Sample badges are currently in use and the in progress part of the buttons will need to be configured still.*/


export default function CourseInProgress(){
    // Using example badges now but in the future will query the database for them
    let badges=["Math Precal","Intro Chemistry","Biology"];
    return(
            <div className="coureprogress-container">
                <hr className="lines"></hr>
                {/* Generates Weekday buttons */}
                <WeekdayButtons className={"weekdayButtons"}/>
                <hr className="lines"></hr>
                <h1 className="sectionTitle">In Progress</h1>
                <hr className="lines"></hr>
                {/* In Progress Courses will go here */}
                <div className="courseBoxes">
                    <CourseBox />
                </div>
                <div className="loadPrompt">Load more...</div>
                <hr className="lines"></hr>
                <h1 className="sectionTitle">ACCOMPLISHMENTS</h1>
                <div className="badgeContainer">
                    {/* Placing badges */}
                    {badges.map(function(badge) {
                        return (<div className="badges" >
                            <img src={badgePlaceHolder}></img>
                        <p1>{badge}</p1>
                        </div>);
                    })}
                </div>
            </div>
    )
}