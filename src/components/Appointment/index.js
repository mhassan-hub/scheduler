import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";

  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    deleteInterview,
  } = props;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save meeting
  function save(name, interviewer) {
    // transition to loading on save
    transition(SAVING);

    const interview = {
      student: name,
      interviewer,
    };

    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.error(error);
        transition(ERROR_SAVE, true);
      });
  }

  function deleteAppointment() {
    transition(DELETE, true);
    deleteInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />

      {/* VISUAL MODES */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview && interview.student}
          interviewer={interview && interview.interviewer}
          onEdit={() => {
            transition(EDIT);
          }}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === EDIT && (
        <Form
          name={interview && interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={() => back()}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this?"
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />
      )}

      {mode === SAVING && <Status message="Loading" />}
      {mode === DELETE && <Status message="Deleting" />}

      {mode === ERROR_DELETE && (
        <Error
          message="Error! Cannot delete this interview"
          onClose={() => transition(SHOW)}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Error! Cannot save this interview"
          onClose={() => transition(CREATE)}
        />
      )}
    </article>
  );
}
