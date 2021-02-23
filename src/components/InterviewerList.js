import React from 'react'
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"
import propTypes from "prop-types"

function InterviewerList(props){ 
  const interviewerList = props.interviewers.map(interviewer => (
    <InterviewerListItem
      key={interviewer.id}
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

InterviewerList.propTypes = {
  interviewers: propTypes.array.isRequired
};

export default InterviewerList; 