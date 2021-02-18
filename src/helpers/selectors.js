export function getAppointmentsForDay(state, day) {
  let output = []
  let days = state.days
  const myDay = days.filter(d => d.name === day)
  if (myDay.length > 0){
    const appointments = myDay[0].appointments
    const myApp = appointments.map(app => output.push(state.appointments[app]))
    return output
  } else {
    return []
  }
}

export function getInterview(state, interview) {
  console.log("In Interview")
  if (interview === null){
    return null 
  }
  let interviewer = interview.interviewer
  console.log("Interviewer", interviewer)
  console.log("State.interviewers", state)
  let input = state.interviewers
  console.log("Input", input)
let output = {
  "student": interview.student,
  "interviewer": input[interviewer]
}
// console.log(interviewer)
// console.log(input)
return output
  
}