import React from 'react';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Error from "components/Appointment/Error";
// import Form from "components/Appointment/Form";

import 'components/Appointment/styles.scss';

export default function Appointment (props) {

  const { time, interview, onEdit, onDelete, onAdd } = props;

  return (
    
    <article className="appointment">
      <Header time={time}/>
      {
      interview ? 
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        /> : <Empty onAdd={onAdd} />
      }
    </article>
  );
}