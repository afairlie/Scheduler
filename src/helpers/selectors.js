
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

const findDayByAppt = (state, id) => {
  const filteredDay = state.days.filter((day) => {
    return day.appointments.includes(id) && day;
  })[0]

  const dayCopy = {...filteredDay, appointments: [...filteredDay.appointments], interviewers: [...filteredDay.interviewers]}

  return dayCopy;
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview, findDayByAppt };