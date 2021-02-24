export const SET_DAY = "SET_DAY"
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA"
export const SET_INTERVIEW = "SET_INTERVIEW"

export default function reducer(state, action) {
  const {day, days, appointments, interviewers, id, spots, interview} = action
  switch(action.type) {
    case SET_DAY:
      { 
      return {
       ...state, day
      }
    }
    case SET_APPLICATION_DATA:{
      return {
        ...state, days, appointments, interviewers
      }
      }
    case SET_INTERVIEW:
      {
      const appointment = {
        ...state.appointments[id],
        interview: interview && { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return {
        ...state, appointments, spots
      }
    }
    default: 
      throw new Error(
        `reduce didn't work with ${action.type}`
      ) 
  }
}