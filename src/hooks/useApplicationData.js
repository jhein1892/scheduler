import React, { useState, useEffect } from "react";
import axios from "axios"

export function useApplicationData(){  
  const [state, setState] = useState(null)
  
  // Setting Day
  const setDay = day => setState({ ...state, day });
  
  // Canceling interview
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
  // Booking Interview
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
  // Booking Interview  
  useEffect(() => {
    console.log("Am I getting here")
    const dayURL = '/api/days' 
    const appURL = '/api/appointments'
    const intURL = '/api/interviewers'
    Promise.all([
      axios.get(dayURL),
      axios.get(appURL),
      axios.get(intURL)
    ]).then((all) => {
      console.log("ALL", all)
      const [first, second, third] = all; 
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data}))
    })  
  }, [])
  console.log("IS THIS RUNNING?")
  console.log("What's my state", state)
return { state, setDay, bookInterview, cancelInterview };
};