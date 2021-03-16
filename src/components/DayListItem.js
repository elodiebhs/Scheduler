import React from "react";

import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const formatSpots = (number) => {
    if(number === 0) {
      return "no spots remaining"
    } else if (number === 1) {
      return "1 spot remaining"
    } else if (number === 2) {
      return "2 spots remaining"
    }
    
  }
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
      
    </li>
  );
}