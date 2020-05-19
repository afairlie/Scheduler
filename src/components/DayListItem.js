import React from "react";
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;

  const defaultClass = 'day-list__item';
  const dayClass = classNames( defaultClass, {[defaultClass + '--selected']: selected, [defaultClass + '--full']: spots === 0})

  const formatSpots = (spots) => {
    switch (spots) {
      case 0: 
        return 'no spots remaining';
      case 1:
        return '1 spot remaining';
      default:
        return `${spots} spots remaining`;
    }
  }

  return (
    <li data-testid='day' className={dayClass} onClick={spots ? setDay : null}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}