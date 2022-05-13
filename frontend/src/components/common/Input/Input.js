import React from "react";
import "./style.css";

const _handleChange = (onChange) => (e) => {
  onChange(e);
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
  ...props
}) => {
  return (
    <div className="input-container" style={{ width: wrapperWidth }}>
      <label>{label}</label>
      <div className="input-field" style={{ width }}>
        <input
          autoComplete="nope"
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
