// import { action } from '@storybook/addon-actions/dist/preview';
import React, { useState } from 'react'
import Button from "../Button"
import InterviewerList from "../InterviewerList"

export default function Form(props) {
const [name, setName ] = useState(props.name || "");
const [error, setError] = useState("");
const [interviewer, setInterviewer ] = useState(props.interviewer || null);

let reset = function() {
    setName(""); 
    setInterviewer(null); 
}
let cancel = function() {
  props.onCancel();
  reset();
}

let validate = function() {
  console.log("name", name)
  console.log("interviewer", interviewer)
  if (name === "") {
    setError("Student name cannot be blank");
    return;
  }
  if (interviewer === null){
    setError("Must pick an interviewer");
    return;
  }
  setError("")
  props.onSave(name, interviewer); 
}

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid = "student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}