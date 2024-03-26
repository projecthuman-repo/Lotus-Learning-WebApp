import "./Profile-Button.css";
import ProfileImage from "../../Images/Profile-Image.png";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

// Coded By Joseph Choi

const ProfileButton = () => {
    return (
        <>
            <div className="profile-button">
                <Button component="span"
                    sx={{
                        position: "absolute",
                        width: 275,
                        height: 275,
                        p: 6,
                        border: "2px solid #757575",
                        borderRadius: 50,
                        background: "#D9D9D9"
                    }}>
                    <img src={ProfileImage} alt="profile-pic" />
                </Button>
            </div>
            <div className="upload">
                <span>
                    <FontAwesomeIcon icon={faUpload} />
                </span>
                <span className="upload-space">
                    Upload Profile Photo
                </span>
            </div>
        </>
    );
}

export default ProfileButton;