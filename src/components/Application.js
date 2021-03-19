import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment/Index";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from 'helpers/selectors';


export default function Application(props) {
  

 //Export applications
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}

  });


//Get apppointments and interviews per day
  const appointments = getAppointmentsForDay(state, state.day);
  //console.log(appointments)

  const interviewers = getInterviewersForDay(state, state.day);
  //console.log("interviewers", interviewers)

  //SHOULD THIS BE DOWN?
  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

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
    function cancelInterview(id){
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
        setState({ ...state, appointments});
       })
    }

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = day => setState({ ...state, day });

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
        {schedule}
        {/* {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)} */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );

}
