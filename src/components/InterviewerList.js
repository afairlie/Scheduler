import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

export default function InterviewerList(props) {
  // const {interviewers, interviewer, setInterviewer} = props;
  const {interviewers, value, setInterviewer} = props;

  const list = interviewers.map((interviewerItem) => {
    return <InterviewerListItem 
    selected={interviewerItem.id === value} 
    setInterviewer={ event => setInterviewer(interviewerItem.id)}
    {...interviewerItem}
    key={interviewerItem.id}
    />
  })

  return <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
  </section>
}