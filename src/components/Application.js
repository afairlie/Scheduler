import React from "react";

import useApplicationData from '../hooks/useApplicationData'
import DayList from 'components/DayList.js';
import Appointment from 'components/Appointment'
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors';

import "components/Application.scss";

// a feature of this architecture: keep persistent stuff all in the same level up above

export default function Application(props) {
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData()


  const appointmentList = getAppointmentsForDay(state, state.day).map( appointment => {
    
    const interviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        /> 
        <hr className='sidebar__separator sidebar--centered'></hr>
        <nav className='sidebar__menu'>
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img 
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
