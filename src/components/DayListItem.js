import React from "react";
import classNames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const {name, spots, selected} = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  const formatSpots = () => {
    return (!spots ? "no spots remaining" : (spots === 1 ? `1 spot remaining` : `${spots} spots remaining`));
  }

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}