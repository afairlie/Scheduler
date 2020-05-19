import React, {useState} from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

export default function Form(props) {
  const {interviewers, onSave, onCancel} = props;
  // props.interviewer, props.name
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');
  const [error, setError] = useState("");

  const reset = () => {
    setInterviewer(null);
    setName('');
  }
  const cancel = () => {
    reset()
    onCancel()
  }

  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError('');
    onSave(name, interviewer)
  }

  const updateName = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }

  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          // onChange={event => setName(event.target.value)}
          onChange={updateName}
          data-testid='student-name-input'
        />
        <section className="appointment__validation">{error}</section>
      </form>
      <InterviewerList 
        interviewers={interviewers} 
        value={interviewer} 
        setInterviewer={setInterviewer} 
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save</Button>
      </section>
    </section>
  </main>
}