//Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

export const getAppointmentsForDay = (state, day) => {

  const appointmentDay = state.days.find(currentDay => { return currentDay.name === day} )
  //console.log(appointmentDay)
  // console.log(appointmentDay.appointments)
  // console.log(state.appointments)

  if (!appointmentDay){
  return []
  }
  const ids = appointmentDay.appointments
  
  return ids.map(id => state.appointments [id])
}

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.
export const getInterview = (state, interview) => {
  let newObj = {}

  if (!interview) {
      return null
  } else {
    for(let element in state.interviewers) {
        if(state.interviewers[element].id === interview.interviewer) {
          const student = interview.student
          newObj = {
            student,
            interviewer: {
              ...state.interviewers[element]
            }
          }
        }
      }
    }
    return newObj
  }

