import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
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
        time: "3pm",
        interview: {
          student: "Jonesy",
          interviewer: {
            id: 3, 
            name: "Mildred Nazir", 
            avatar: "https://i.imgur.com/T2WwVfS.png"
          }
        }
      },
      {
        id:4,
        time: '4pm'
      }
    ],
    interviewers: {}
  });
  const setDay = (day) => setState({ ...state, day });
  
  useEffect(() => {
    
    // resolve all the promises of API calls once
      Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {

      // change state within our days, appointments and interviewers 
      // based on information we get back from the API
      setState(prev => (
      {...prev, 
      days: all[0].data, 
      appointments: all[1].data, 
      interviewers: all[2].data
      }));
    });
  
  }, [])

  // booking a new interview 
  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(interviewObj => {
      
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });

    });
  }

  function deleteInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      // reassigning appointments and appointment with interview null
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
}