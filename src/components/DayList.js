import React from "react";
// import classNames from 'classnames';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const DayListData = props.days.map((DayListItemData) => {
    return (
      <DayListItem
        key={DayListItemData.id}
        name={DayListItemData.name}
        spots={DayListItemData.spots}
        selected={DayListItemData.name === props.day}
        setDay={() => props.setDay(DayListItemData.name)}
      />
    );
  });
  return <ul>{DayListData}</ul>;
}
