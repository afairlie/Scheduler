import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

export default function InterviewerListItem(props) {
  const {name, avatar, selected, setInterviewer} = props;
  const defaultClass = 'interviewers__item'
  const interviewClass = classNames(defaultClass, {[defaultClass + '--selected']: selected})

  return <li className={interviewClass} onClick={setInterviewer}>
  <img
    className={defaultClass + '-image'}
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>
}