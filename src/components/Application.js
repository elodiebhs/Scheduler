import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment/Index";
import { getInterview, getAppointmentsForDay, getInterviewersForDay } from 'helpers/selectors';
import useApplicationData from 'hooks/useApplicationsData';


export default function Application(props) {


  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()

  //Get apppointments and interviews per day
  const appointments = getAppointmentsForDay(state, state.day);
  //console.log(appointments)

  const interviewers = getInterviewersForDay(state, state.day);
  //console.log("interviewers", interviewers)



  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);



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
