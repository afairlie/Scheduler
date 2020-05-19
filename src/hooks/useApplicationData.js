import {useState, useEffect} from 'react';
import axios from 'axios';
import { findDayByAppt } from '../helpers/selectors'

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  // this useEffect only executes once AFTER render of all components and updates the virtual DOM accordingly.
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])



  const bookInterview = (id, interview) => {
    return axios.put({
      url: `/api/appointments/${id}`,
      data: { interview }
    })
    .then(res => {
      const day = findDayByAppt(state, id)
      // does the appointment already exist?
      if (!state.appointments[id].interview){
        day.spots--;
      }
      const days = [...state.days]
      days[day.id - 1] = day;
      setState(prev => ({...prev, days: [...days]}));
      return res;
    })
    .then( res => {
      const appointment = {...state.appointments[id], interview: { ...interview }};
      const appointments = {...state.appointments, [id]: appointment};
      setState(prev => ({...prev, appointments}))
    })
  }

  const cancelInterview = (id) => {
    return axios.delete({
      url: `/api/appointments/${id}`,
      data: { interview: null }
    })
    .then(res => {
      const day = findDayByAppt(state, id)
      day.spots++;
      const days = [...state.days]
      days[day.id - 1] = day;
      setState(prev => ({...prev, days: [...days]}));
      return res;
    })
    .then(res => {
      const appointment = {...state.appointments[id], interview: null};
      const appointments = {...state.appointments, [id]: appointment}
      setState(prev => ({...prev, appointments}))
    })
  }

  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;