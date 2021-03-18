

// export function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day){
  //Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

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


