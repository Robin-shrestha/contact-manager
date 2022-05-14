import React from "react";
import classNames from "classnames";

import "./style.css";

const _handleChange = (onChange) => (e) => {
  const value = e.target.value;
  onChange(value);
};

const Input = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  prefix,
  wrapperWidth = "144px",
  width = "144px",
  className,
  wrapperClassName,
  required = false,
  isDisabled,
  ...props
}) => {
  return (
    <div
      className={classNames("input-field-container", wrapperClassName, {
        required: required,
        disabled: isDisabled,
      })}
      style={{ width: width > wrapperWidth ? width : wrapperWidth }}
    >
      {label && <label>{label}</label>}
      <div className={classNames("input-field", className)} style={{ width }}>
        <input
          autoComplete="nope"
          disabled={isDisabled}
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={_handleChange(onChange)}
          {...props}
        />
        {prefix && <span className="prefix">{prefix}</span>}
      </div>
    </div>
  );
};

export default Input;
