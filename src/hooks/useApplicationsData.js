// Our useApplicationData Hook will return an object with four keys.

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.

import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
   //Export applications
   const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });

  const setDay = day => setState({ ...state, day });

  //Book Appointment
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }

  //Delete the appointment
  //will use the appointment id to find the right appointment slot and set it's interview data to null.
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments });
      })
  }

  //Update remaining spots
  // WHERE : days.spots
  //WHEN : change when we create or delete an appointment
  //HOW TO CALCULATE : 5 spots per days - what is booked

const getBookedCount = function(days, appointment){
  let count = 0 ;

  for (const id of days.appointments){
    const appointment = appointments [id];
    if(appointment.interview){
      count ++;
    }
  }
  return count;
}


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third

      const [first, second, third] = all;

      //console.log(first, second, third);
      // set your states here with the correct values...
      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    })
  }, [])



  return {state, setDay, bookInterview, cancelInterview}
}
