import React, {Fragment} from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import classNames from 'classnames';
import './styles.scss';

// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.

export default function Appointment(props) {
  const {time, interview} = props;

  return <article className="appointment">
    <Header time={time}/>
    {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
  </article>
}