import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"; 
import { useVisualMode }  from "hooks/useVisualMode.js"
import action from '@storybook/addon-actions/dist/preview/action';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"; 
const CONFIRM = "CONFIRM"; 

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    console.log(" IN SAVE" ,props)
    // console.log(props.interview)
    // let bookInterview = props.bookInterview
    
    const interview = {
      student: props.name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    
    // return bookInterview(interview.name, interview.interviewer)
  };

  function Delete() {
    transition(DELETE)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      
    
    console.log("In DELETE", props)
    
    
  }

  // What this component is returning
  return(
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          />
      )}
      {mode === CREATE && (
        <Form
          key={props.key}
          interviewers= {props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
          />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETE && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={() => back(SHOW)}
          onConfirm={() => Delete()}
        />
      )}
    </article>
  )
}