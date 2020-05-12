import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
// days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
  const {days, day, setDay} = props;

  const list = days.map((dayItem) => {
    const {id, name, spots} = dayItem;
    return <DayListItem 
      key={id}
      name={name} 
      spots={spots}
      selected={name === day}
      setDay={setDay}
    />
  })

  return <ul>{list}</ul>
}