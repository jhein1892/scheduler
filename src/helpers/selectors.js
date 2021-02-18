export function getAppointmentsForDay(state, day) {
  let output = []
  let days = state.days
  const myDay = days.filter(d => d.name === day)
  if (myDay.length > 0){
    const appointments = myDay[0].appointments
    appointments.map(app => output.push(state.appointments[app]))
    return output
  } else {
    return []
  }
}

export function getInterview(state, interview) {
  if (interview === null){
    return null 
  }
  let interviewer = interview.interviewer
  let input = state.interviewers
  let output = {
    "student": interview.student,
    "interviewer": input[interviewer]
  }
  // console.log(interviewer)
  // console.log(input)
  return output
  
}

    export function getInterviewersForDay(state, day) {
      // let output = []
      let days = state.days
      const myDay = days.filter(d => d.name === day)
      
      if (myDay.length > 0){        
        let output = myDay[0].interviewers 
        const myInt = state.interviewers
        const myInts = output.map(out => myInt[out])
        return myInts
      } else {
        return []
      }
    
      // console.log("myDay", myDay[0].appointments)
      // if (myApp.interview !== null){
      //   const myInt = myApp.interview
      //   console.log(myInt)
      // }
      // if (myDay.length > 0){
      //   const appointments = myDay[0].appointments
      //   appointments.map(app => output.push(state.appointments[app]))
      //   return output
      // } else {
      //   return []
      // }
    }