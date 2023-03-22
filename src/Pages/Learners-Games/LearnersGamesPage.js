import LearnersProfileTemplate from "../Learners-Profile-Template/Learners-Profile-Template.js";
import "./LearnersGamesPage.css";
import ProfileButton from "../../components/Profile-Button/Profile-Button.js";

function LearnersGames(){
    return(
        <>
        <h1>hello world</h1>
        <ProfileButton/>
        </>
    );
}


export default function LearnersGamesPage(){
    return(
        <LearnersProfileTemplate childComponent={LearnersGames}/>
    );
}