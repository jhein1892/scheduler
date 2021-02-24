import { useEffect, useReducer } from "react";
import axios from "axios"
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";



export function useApplicationData(){
// const SET_DAY = "SET_DAY"
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
// const SET_INTERVIEW = "SET_INTERVIEW"
  const initialState = {
    day: "Monday",
    days:[],
    appointments: {},
    interviewers: {}
  }
const [state, dispatch] = useReducer(reducer, initialState)

const setDay = day => dispatch({type: SET_DAY, day});

// function reducer(state, action) {
//   const {day, days, appointments, interviewers, id, spots, interview} = action
//   switch(action.type) {
//     case SET_DAY:
//       { 
//       return {
//        ...state, day
//       }
//     }
//     case SET_APPLICATION_DATA:{
//       return {
//         ...state, days, appointments, interviewers
//       }
//       }
//     case SET_INTERVIEW:
//       {
//       const appointment = {
//         ...state.appointments[id],
//         interview: interview && { ...interview }
//       };
//       const appointments = {
//         ...state.appointments,
//         [id]: appointment
//       };
//       return {
//         ...state, appointments, spots
//       }
//     }
//     default: 
//       throw new Error(
//         `reduce didn't work with ${action.type}`
//       ) 
//   }
// }

// Booking interview
function bookInterview(id, interview) {
    
  const appointment = {
    ...state.appointments[id],
    interview: interview && { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const spots = state.days.filter(day => {
    
    if (day.name === state.day && state.appointments[id].interview === null){
      day.spots -= 1; 
    }
    })
  let URL = `/api/appointments/${id}`
  return axios.put(URL, {interview})
  .then(() => dispatch({type: SET_INTERVIEW, id, interview, appointments, spots}))
    
  }
  // .catch((error) => console.log("error", error))


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
  const spots = state.days.filter(day => {
    if (day.name === state.day){
      day.spots += 1; 
    } 
    })
  return axios.delete(URL)
  .then(() => 
  dispatch({type: SET_INTERVIEW, id, interview, appointments, spots: spots}))
  // .catch((error) => console.log("error", error))
}

useEffect(() => {
  // Need to comment out lines 102-114 when testing
  // const newSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)
  // newSocket.onopen = () => {
  //   newSocket.send("Ping")
  // }
  // newSocket.onmessage = function(event) {
  //   console.log("event", event)
  //   const {type, id, interview} = JSON.parse(event.data);
  //   if (type === SET_INTERVIEW){
  //     console.log('THis is an interview!')
  //     dispatch({type:type, id:id, interview:interview})
       
  //   }
  // }
  const dayURL = '/api/days'
  const appURL = '/api/appointments'
  const intURL = '/api/interviewers'
  Promise.all([
    axios.get(dayURL), 
    axios.get(appURL),
    axios.get(intURL)
  ]).then((all) => {
    // const [first, second, third] = all; 
    dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})
  })  

  // newSocket.onmessage = function(event) {
  //   const {type, id, interview} = JSON.parse(event.data);
  //   // if (type === SET_INTERVIEW) {
  //   //   newSocket.send()
  //   // }
  // }
  
}, [])  
return { state, setDay, bookInterview, cancelInterview };
}

