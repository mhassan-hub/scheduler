import React from "react";
// import classNames from 'classnames';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewersList = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        selected={interviewer.id === props.value}
        avatar={interviewer.avatar}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      />
      
    );
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewersList}</ul>
    </section> 
  );
}