import "./Notification-Block.css";

/*
This will display a scaleable notification block
The text is sent to the function using a prop courseDescription
It is also informed if it is a new notification or not based on the prop newNotification
*/
export default function NotificationBlock(props){
    if(props.newNotification===true){
        return (
            <div className="NotificationBlock">
                <div style={{backgroundColor: "#2699FB"}} className="selectionCircle"></div> 
                <p className="nottext">{props.courseDescription}</p>
                <div className="notimg"></div> 
            </div>
        );
    }
    else{
        return (
            <div className="NotificationBlock">
                <div className="selectionCircle"></div> 
                <p className="nottext">{props.courseDescription}</p>
                <div className="notimg"></div> 
            </div>
        );
    }
}
