import "./WeekdayButtons.css";
// Coded by Taylor Oxelgren

/* This function return buttons for all days of the week and should be modular to use on other profile types*/
export default function WeekdayButtons(){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    return (
        <div className="buttonFrame">
            {/* Maps each day to the function call, which produces a button */}
            {days.map(function(day) {
                return <button className="weekdayButtons">{day}</button>;
            })}
        </div>
      );
    }