

export function getAppointmentsForDay (state, day){
  const { days, appointments } = state; 
  const findDays = days.find((dayArr) => dayArr.name === day);

  if (!findDays || findDays.appointments.length === 0) {
    return [];
  }
  const appointmentsArr = findDays.appointments;

  const appointmentsPerDay = appointmentsArr.map((appointmentId) => appointments[appointmentId]);

  return appointmentsPerDay;
}

export function getInterview (state, interview){
  const  {interviewers} = state
  let interviewerData= {};
  let interviewId = interview ? interview.interviewer : null;
  
  if(interviewId){
    
    interviewerData={...interviewers[interviewId]}
    const interviewObj = {interviewer: interviewerData, student:interview.student}

    return interviewObj;
  }

  return null;
}