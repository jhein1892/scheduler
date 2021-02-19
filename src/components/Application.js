import React, { useState, useEffect } from "react";
import axios from "axios"
import DayList from "components/DayList"
import "components/Application.scss";
import "components/Appointment"; 
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {
  //State
  const [state, setState] = useState({
    day: "Monday",
    days:[],
    appointments: {},
    interviewers: {}
  })

  // Booking Appointments 
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let URL = `/api/appointments/${id}`
    return axios.put(URL, {interview})
    .then(() => setState ({
      ...state, appointments
    }))
    // .catch((error) => console.log("error", error))
  } 

  function cancelInterview(id){
    let URL = `/api/appointments/${id}`
    let interview = null
    
    const appointment ={
      ...state.appointments[id],
      interview: null 
    }
    const appointments ={
      ...state.appointments,
      [id]: appointment 
    }
    return axios.delete(URL)
    .then(() => 
     setState ({
        ...state, appointments
      })
    )
    // .catch((error) => console.log("error", error))
  }
  
  // Getting appointments, interviewers, and specific interview
  const dailyAppointments = getAppointmentsForDay(state, state.day); 
  const interviewers = getInterviewersForDay(state, state.day)

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

     

    const setDay = day => setState({ ...state, day });

    // pulling info form our APIs
    useEffect(() => {
      const dayURL = '/api/days' 
      const appURL = '/api/appointments'
      const intURL = '/api/interviewers'
      Promise.all([
        axios.get(dayURL),
        axios.get(appURL),
        axios.get(intURL)
      ]).then((all) => {
        const [first, second, third] = all; 
        setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}))
      })  
    }, [])

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
