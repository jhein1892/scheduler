import React from 'react';
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { useVisualMode }  from "hooks/useVisualMode.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";



export default function Appointment(props) {
  return(
    <article className="appointment">
      
      <Header time={props.time}/>
      { props.interview ? <Show name={props.interview.student} interviewer/> : <Empty/> }
      
    </article>
  )
}