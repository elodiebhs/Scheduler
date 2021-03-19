import React from "react";
import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";

export default function Appointment(props) {

  //When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* If we start in the EMPTY mode and call transition(CREATE) then the mode will be changed, and React will render the component. */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {/* When the mode === CREATE we want to show the Form component. */}
      {mode === CREATE && 
      (<Form
       interviewers={props.interviewers}
       onCancel ={back}
       onSave={save}
      />)
      
      }
    </article>
  )
}

