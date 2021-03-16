import React from "react";

import "components/InterviewerListItem.scss";
import classNames from 'classnames';

export default function InterviewerListItem(props){
  // const interviewer= props.interviewer.map(interview => {
  //   return <InterviewerListItem
  //   key={interview.id}
  //   name={interview.name} 
  //   avatar={interview.avatar} 
  //   selected={interview.name === props.interview}
  //   setInterviewer={props.setInterviewer}
    
  //     />
  //})

  const interviewerClass = classNames("interviewers__item",{
    "interviewers__item--selected":props.selected
  })
  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      
    <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
    />

      {props.selected && props.name}
    </li>
  );
}