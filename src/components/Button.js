import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
  return (
    <button
      className={classNames("button", " button--danger", " button--confirm")}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
