import React from "react";
import classnames from "classnames";

import "./style.css";
import { buttonTypes } from "../../../constants/strings";

const _customType = (customType) => {
  switch (customType) {
    case buttonTypes.ADD:
      return "add";
    case buttonTypes.EDIT:
      return "edit";
    case buttonTypes.DEFAULT:
      return "";
    case buttonTypes.CANCEL:
      return "cancel";
    case buttonTypes.SUBMIT:
      return "submit";
    default:
      return "";
  }
};
const Button = ({
  onClick,
  children,
  className,
  isDisabled,
  customType,
  style,
  ...rest
}) => {
  const _onClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={_onClick}
      className={classnames("btn-root", _customType(customType), className, {
        disabled: isDisabled,
      })}
      style={style}
      {...rest}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
