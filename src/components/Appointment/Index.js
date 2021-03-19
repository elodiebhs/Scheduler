import React from "react";
import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";
const SAVING ="SAVING";
const DELETE ="DELETE";
const CONFIRM="CONFIRM"
const EDIT="EDIT";

export default function Appointment(props) {

  //When props.interview contains a value, then we want to pass useVisualMode the SHOW mode, if it is empty then we should pass EMPTY.
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  //Save the appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition (SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }
  //Cancel/delete an appointment
  function cancel(){
    transition(DELETE)
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  function confirm(){
    transition (CONFIRM)
  }

  function edit(){
    transition(EDIT)
  }


  //Edit an appointment

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* If we start in the EMPTY mode and call transition(CREATE) then the mode will be changed, and React will render the component. */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE) } />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
          
        />
      )}
      
      {/* When the mode === CREATE we want to show the Form component. */}
      {mode === CREATE && 
      (<Form
       interviewers={props.interviewers}
       onCancel ={back}
       onSave={save}
      />
      )}
      {mode === SAVING && <Status message={'Saving'} /> }
      {mode === DELETE && <Status message={'Deleting'} /> }
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} message={'Confirming Delete'} /> }
      {mode === EDIT && 
      (<Form
       name={props.interview.student}
       interviewer={props.interview.interviewer.id}
       interviewers={props.interviewers}
       onCancel ={back}
       onSave={save}
      />
      )}
    </article>
  );
}

