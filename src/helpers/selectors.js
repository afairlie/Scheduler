
const getAppointmentsForDay = (state, day) => {

  if (state.days.length === 0){return []}
  const appointments = state.days.filter(dayObj => dayObj.name === day)[0];

  if(!appointments){return []}
  const appointmentsList = appointments.appointments.map(id => {
    return state.appointments[id]
  })

  return appointmentsList
}

function getInterview(state, interview) {
  if (!interview) return null;

  const result = state.interviewers[interview.interviewer]

  return {  
    student: interview.student,
    interviewer: {...result}
  };

}

export { getAppointmentsForDay, getInterview };