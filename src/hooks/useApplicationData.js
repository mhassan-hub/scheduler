import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
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
    .then(() => {
      
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const updatedDays = updateSpots(state.day, state.days, appointments)

      setState({
        ...state,
        days: updatedDays,
        appointments
      });

      // setDay to decrease spots remaining and display the proper amount on booking the appointment
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

      const updatedDays = updateSpots(state.day, state.days, appointments);
      
      setState({
        ...state,
        appointments,
        days: updatedDays
      });
      // setDay to increase spots remaining and display the proper amount on booking the appointment
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    deleteInterview
  };
}

function updateSpots (dayName, days, updatedAppointments) {
  
  const specificDay = days.find((day) => day.name === dayName);
  // getting the index of the specific day
  const specificDayIndex = days.findIndex((day) => day.name === dayName);
  // array of appointment ids
  const dayAppointments = specificDay.appointments; 
  
  // filter the day appointments by checking the appointment object for id's that contain interview = null and getting the length of the result to check how many spots are left.
  const spots = dayAppointments.filter(apptId => updatedAppointments[apptId].interview === null).length;

  // creating a copy of specific day and adding the new spots remaining
  const updatedDay = {...specificDay, spots};

  const updatedDays = [...days];
  updatedDays[specificDayIndex] = updatedDay;
  
  return updatedDays;
};