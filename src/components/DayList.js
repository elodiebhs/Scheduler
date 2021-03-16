import React, {useState} from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //const [days, setDay] = useState(days)
 const days = props.days.map(day => {
   return <DayListItem 
   key={day.id}
   name={day.name} 
   spots={day.spots} 
   selected={day.name === props.day}
   setDay={props.setDay}  />
 })

  return (
    <ul>
     {/* iterate on the array of days since each day in that array contains the necessary information to populate one DayListItem component */}
     
    {days}

    </ul>
  );
}
