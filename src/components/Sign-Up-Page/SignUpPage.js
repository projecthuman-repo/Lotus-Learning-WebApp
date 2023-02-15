import "./SignUpPage.css"; 

export default function SignUpPage() {
    return(
        <>
            <div className="contentBox">
                {/* The exit icon */}
                <div className="exitIcon"></div> 
                {/* Logo */}
                <div className="logo"></div>
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
                <div className="su-With">Sign up with Google</div>
                <div className="su-With">Sign up with Facebook</div>
                <footer className="signUpFooter">Need an account? <b>Create your account</b></footer>
            </div>
        </>
    );

}
