import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

export default function Button(props) {
   const {children, confirm, danger, disabled, onClick} = props;
   const classes = classNames('button', {'button--confirm': confirm}, {'button--danger': danger});

   return <button disabled={disabled} className={classes} onClick={onClick}>{children}</button>
}
