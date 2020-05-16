import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  const {days, day, setDay} = props;

  const list = days.map((dayItem) => {
    const {id, name, spots } = dayItem;
    return <DayListItem 
      key={id}
      name={name}
      spots={spots}
      selected={name === day}
      setDay={(event) => setDay(name)}
    />
  })

  return <ul>{list}</ul>
}