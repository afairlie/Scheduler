import { useEffect, useReducer } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return {...state, day: action.day}
    }
    case SET_APPLICATION_DATA: {
      console.log('set_application runs')
      console.log('days: ', action.days)
      return {...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    }
    case SET_INTERVIEW: {
      console.log('set_interview runs')

      const updateSpots = (state) => {
        // for each day, you want to loop over the day, and count the free spots
        const days = state.days.map(day => {
          let spots = 0;

          day.appointments.forEach(appointmentID => {
            if (!state.appointments[appointmentID].interview) {
              console.log(state.appointments[appointmentID])
              spots++;
            }
          })

          day.spots = spots;
          console.log(day.spots)
          return day;
        })
        // THIS RETURN IN JEST SEEMS ODD.
        console.log('days before returned: ', days)
        return days;
      }

      if (!action.interview) {
        const newState = {...state}
        
        newState.appointments[action.id].interview = null
        newState.days = updateSpots(newState)

        return newState;
      } else {
        const newState = {...state}
        
        newState.appointments[action.id].interview = action.interview
        newState.days = updateSpots(newState)

        return newState;
      }
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, { 
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    })

  const setDay = day => dispatch({type: SET_DAY, day})

  // this useEffect only executes once AFTER render of all components and updates the virtual DOM accordingly.
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
    .then(all => {
      // console.log(all)
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA, 
        days: days, 
        appointments: appointments, 
        interviewers: interviewers})
      return true;
    })
  }, [])



  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then( (res) => {
      dispatch({type: SET_INTERVIEW, id, interview})
      return true;
    })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`, { interview: null })
    .then(res => {
      dispatch({type: SET_INTERVIEW, id, interview: null})
      return true;
    })
  }

  return {state, setDay, bookInterview, cancelInterview};
}

export default useApplicationData;