import React from 'react'
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props){ 
  // Props:
  // interviewers array - an array of objects containing the information of each interviewer
  // interviewer: number - the id of an interviewer
  // setInterviewer: function - a function that accepts an interviewer id
  console.log("In InterviewList", props.interviewers)
  const interviewerList = props.interviewers.map(interviewer => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.value === interviewer.id}
      setInterviewer={event => props.onChange(interviewer.id)}
      /> 
  )) 
 
  return( 
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}     