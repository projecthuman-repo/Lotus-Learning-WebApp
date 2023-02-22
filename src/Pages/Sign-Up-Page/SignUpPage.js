import "./SignUpPage.css"; 

/*Coded by: Taylor Oxelgren */
import Logo from "../../Images/BLN_Logo.png";
import fbIcon from "../../Images/fb_icon.svg";
import googleIcon from "../../Images/Googleicon.svg";

export default function SignUpPage() {
    return(
        <>
            <div className="contentBox">
                {/* The exit icon */}
                <div className="exitIcon"></div> 
                {/* Logo */}
                <div className="logo">
                    <img className="logo-img" src={Logo} alt="Logo"></img>
                </div>
                {/* <img className="Logo" src={Logo} alt="Logo" /> */}
                {/* Select login or sign up */}
                <div className="log-sign-selector">
                    <div className="loginSelector">Login</div>
                    <div className="signUpSelector">Sign Up</div>
                </div>
                {/* Login/signup text boxes for input*/}
                <form className="signUp">
                    <input type="text" className="signUpBox" id="user" placeholder="Email or Username"></input><br></br>
                    <input type="text" className="signUpBox" id="password" placeholder="Password"></input><br></br>
                    <input type="submit" className="signUpButton" value="Sign Up"></input>
                </form>
                {/* Or with the lines */}
                <div className="or">
                    <hr className="lines"></hr>
                    OR
                    <hr className="lines"></hr>
                </div>
                {/* sign up with buttons */}
                <div className="su-With">
                    <img src={googleIcon} className="icons" alt="Googleicon"></img>
                    Sign up with Google
                </div>
                <div className="su-With">
                    <img src={fbIcon} id="fbIcon" className="icons" alt="fb_icon"></img>
                    Sign up with Facebook</div>
                <footer className="signUpFooter">Need an account? <b>Create your account</b></footer>
            </div>
        </>
    );

}
