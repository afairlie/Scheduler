import React, { useEffect } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_DELETE = 'ERROR_DELETE';
const ERROR_SAVE = 'ERROR_SAVE';

export default function Appointment({id, time, interview, interviewers, bookInterview, cancelInterview}) {
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );
  const onAdd = () => {
    transition(CREATE)
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(id, interview)
    .then(()=> {transition(SHOW)})
    .catch(e => transition(ERROR_SAVE, true))
  }

  const edit = () => {
    transition(EDIT)
  }

  const confirm = () => {
    transition(CONFIRM)
  }

  const onDelete = () => {
    transition(DELETING)
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch(e => transition(ERROR_DELETE, true))
  }

  return <article className="appointment">
    <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && !interview &&  <Empty onAdd={onAdd} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={interviewers} 
          onCancel={back} 
          onSave={save} 
        />
      }
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === EDIT && 
        <Form 
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      }
      {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={back}/>}
      {mode === CONFIRM && 
        <Confirm 
          message='Are you sure you would like to delete?' 
          onConfirm={onDelete} 
          onCancel={back} 
        />
      }
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back}/>}
  </article>
}

