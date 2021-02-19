import React, { useState, useEffect } from "react";
import axios from "axios"
import DayList from "components/DayList"
import "components/Application.scss";
import "components/Appointment"; 
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import { useApplicationData } from "../hooks/useApplicationData"

export default function Application(props) {
  //State custom Hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Booking Appointments 

console.log("Props", state)
if (!state){
  return null
}
  // Getting appointments, interviewers, and specific interview
  const interviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day); 

  const appointmentList = dailyAppointments.map(app =>{
    const interview = getInterview(state, app.interview);

    return ( 
    <Appointment
      key={app.id}
      id={app.id}
      time={app.time}
      interview={interview}
      interviewers={interviewers}
      bookInterview= {bookInterview}
      cancelInterview={cancelInterview}
    />
    )
    })

     

    

    // pulling info form our APIs

    // What we are returning from the component 
    return (
      <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
