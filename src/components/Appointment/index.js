import React from 'react';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";

import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode"


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { time, interview, onEdit, onDelete, onAdd } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      }
      {mode === CREATE && 
      <Form 
        interviewers={[]}
        onCancel={() => back()}
        />
      }
    </article>
  );
}