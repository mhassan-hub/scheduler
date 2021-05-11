import React from "react";
// import classNames from 'classnames';
import DayListItem from "components/DayListItem";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function DayList(props) {
  const DayListData = days.map(DayListItemData => {
    return (
      <DayListItem key={DayListItemData.id} 
        name={DayListItemData.name} 
        spots={DayListItemData.spots} 
        selected={DayListItemData.name === props.day}
        setDay={props.setDay}
      />
    );
  })
  return (
    <ul>
      {DayListData}
    </ul>
  );
}