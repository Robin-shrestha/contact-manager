import React from "react";
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
  wrapperWidth = "250px",
  width = "250px",
  ...props
}) => {
  return (
    <div class="input-container" style={{ width: wrapperWidth }}>
      <label>{label}</label>
      <div className="input-field" style={{ width }}>
        <input
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
