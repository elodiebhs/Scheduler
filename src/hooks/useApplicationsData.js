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

  //Update remaining spots
  
  const spotsLeft = function (daysObj, appointments) {
    let count = 0;

    for (const id of daysObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  }

  const updateSpots = function (dayName, days, appointments) {
    // we loop arounds days, .find returns the value of the first element in the provided array, where element.name==dayName
    //if true day will be the first element in the array
    const day = days.find(element => element.name === dayName);
    //unbooked give us an number of spots not books
    const unbooked = spotsLeft(day, appointments)
    //console.log (unbooked)

    const newArrayState = days.map(element => {
      if (element.name === dayName) {
        console.log(element.name)
        return { ...element, spots: unbooked }
      }
      return element;
    })
    console.log(newArrayState)
    return newArrayState;
  }

  //Book Appointment
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = updateSpots(state.day, state.days, appointments);
    console.log(spots)

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days: spots
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

    const spots = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: spots });
      })
  }


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      //console.log(all[0]); // first
      //console.log(all[1]); // second
      //console.log(all[2]); // third

      const [first, second, third] = all;

      setState(prev => ({ ...prev, days: first.data, appointments: second.data, interviewers: third.data }));
    })
  }, [])

  return { state, setDay, bookInterview, cancelInterview }
}
