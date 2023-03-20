import "./WeekdayButtons.css";
// Coded by Taylor Oxelgren

/* This function return buttons for all days of the week and should be modular to use on other profile types*/
/* can be used for other buttons as well*/
export default function WeekdayButtons(props){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let it=props.prop;
    if(Array.isArray(it)){
        return (
            <div className="buttonFrame">
                {/* Maps each day to the function call, which produces a button */}
                {it.map(function(itr,keyid) {
                    return <button key={keyid} className="weekdayButtons">{itr}</button>;
                })}
            </div>
          );
    }

    return (
        <div className="buttonFrame">
            {/* Maps each day to the function call, which produces a button */}
            {days.map(function(day,keyid) {
                return <button key={keyid} className="weekdayButtons">{day}</button>;
            })}
        </div>
      );
    }
