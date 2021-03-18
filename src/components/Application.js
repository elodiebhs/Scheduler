import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment/Index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: " Miller Hedy",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Elodie Bouthors",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }
];



// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  // const [day, setDay] = useState("Monday")
  
  // const [days, setDays] = useState([]);
  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    
  });
  
  useEffect(() => {
    const URL = '/api/days'
    axios.get(URL).then(response => {
      setDays([...response.data]);
    });
  }, [])

  const setDay = day => setState({ ...state, day });
  const setDays = (days) => {
    setState(prev => ({ ...prev, days }));
}

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
      {/* map over the appointments array to create a list in the schedule section. */}
      {appointments.map((appointment) => <Appointment key={appointment.id} {...appointment} />)}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}
