import React, { useEffect } from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm"; 
import Error from "./Error"; 
import { useVisualMode }  from "hooks/useVisualMode.js"
// import action from '@storybook/addon-actions/dist/preview/action';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE"; 
const CONFIRM = "CONFIRM"; 
const EDIT = "EDIT"; 
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
    // console.log(" IN SAVE" ,props)
    
    const interview = {
      id: props.id,
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true)) 
  };

  function Delete() {
    transition(DELETE, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true))
  
  } 
  useEffect(() => {
    if (props.interview && mode === EMPTY){
      transition(SHOW)
    } 
    if (props.interview === null && mode === SHOW){
      transition(EMPTY)
    }
  }, [props.interview, transition, mode]); 

  // What this component is returning
  return(
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && props.interview && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          />
      )}
      {mode === CREATE && (
        <Form
          // key={props.key}
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
          onCancel={() => back()}
          onConfirm={Delete}
        />
      )}
      {mode === EDIT && (
        <Form
        key={props.id}
        interviewers= {props.interviewers}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not Save"
          onClose={() => {
            back()
            
          } }
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="Could not Delete"
          onClose={() => {
            back()
          }}
        />
      )}
    </article>
  )
} 