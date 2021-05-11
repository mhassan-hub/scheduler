import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

// MY WAY
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


 /* COMPASS WAY
 
 export default function Button(props) {
  const buttonClass = classnames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
} 
 
 */