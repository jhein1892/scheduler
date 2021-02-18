import React, { useState, useEffect } from "react";
import axios from "axios"
import DayList from "components/DayList"
import "components/Application.scss";
import "components/Appointment"; 
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm"
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "John Smith",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];





export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days:[],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day); 
   
  const appointmentList = dailyAppointments.map(app =>{
    const interview = getInterview(state, app.interview);
    
    
    return (
    <Appointment
      key={app.id}
      id={app.id}
      time={app.time}
      interview={interview}
    />
    )
    })
    const setDay = day => setState({ ...state, day });
    // const setDays = days => setState(prev =>({ ...prev, days }));
     
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
       console.log(all)
      })  
    }, [])

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
        <Appointment key="last" time="5pm"/>
      </section>
    </main>
  );
}
