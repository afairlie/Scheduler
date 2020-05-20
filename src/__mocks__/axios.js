import {fixtures} from '../fixtures'

const dayFixtures = [...fixtures.days];
const appointmentFixtures = {...fixtures.appointments};
const interviewerFixtures = {...fixtures.interviewers};

export default {
  defaults: { baseURL: "" },
  get: jest.fn(url => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: dayFixtures
      })
    }

    if (url === "/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: appointmentFixtures
      })
    }

    if (url === "/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: interviewerFixtures
      })
    }
  }),
  put: jest.fn(() => {
    return Promise.resolve({
      status: 204, 
      statusText: "No Content"
    })
  }),
  delete: jest.fn(() => {
    return Promise.resolve({
      status: 204,
      statusText: 'No Content'
    })
  })
}