
const getAppointmentsForDay = (state, day) => {

  if (state.days.length === 0){return []}
  const appointments = state.days.filter(dayObj => dayObj.name === day)[0];

  if(!appointments){return []}
  const appointmentsList = appointments.appointments.map(id => {
    return state.appointments[id]
  })

  return appointmentsList
}

const getInterviewersForDay = (state, day) => {
  if (state.interviewers.length === 0){return []}
  const interviewers = state.days.filter(dayObj => dayObj.name === day)[0];

  if(!interviewers){return []}
  const interviewerList = interviewers.interviewers.map(id => {
    return state.interviewers[id]
  })
  return interviewerList;
}

const getInterview = (state, interview) => {
  if (!interview) return null;

  const result = state.interviewers[interview.interviewer]

  return {  
    student: interview.student,
    interviewer: {...result}
  };

}

const updateSpots = (state) => {
  const days = state.days.map(day => {
    let spotCount = 0;

    day.appointments.forEach(appointmentID => {
      if (!state.appointments[appointmentID].interview) {
        spotCount++;
      }
    })

    day.spots = spotCount;
    return day;
  })
  return days;
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview, updateSpots};