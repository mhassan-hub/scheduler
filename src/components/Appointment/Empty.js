import React from "react";

export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        data-testid="add-appointment"
        className="appointment__add-button"
        onClick={props.onAdd}
        src="images/add.png"
        alt="Add"
      />
    </main>
  );
}
