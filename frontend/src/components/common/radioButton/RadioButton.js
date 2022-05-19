import React, { useEffect, useState } from "react";
import classNames from "classnames";

import "./style.css";

const RadioButton = ({
  options,
  label,
  required,
  id,
  name,
  onChange,
  value,
  wrapperWidth = "144px",
  width = "144px",
  className,
  wrapperClassName,
  isDisabled,
}) => {
  const [checkedValue, setCheckedValue] = useState(value);

  useEffect(() => {
    if (value) {
      setCheckedValue(value);
    }
  }, [value]);

  return (
    <div
      id={id}
      className={classNames("input-field-container", wrapperClassName, {
        required: required,
        disabled: isDisabled,
      })}
      style={{ width: width > wrapperWidth ? width : wrapperWidth }}
    >
      {label && <label>{label}</label>}

      <div className={classNames("radio-field", className)} style={{ width }}>
        {Array.isArray(options) && options.length
          ? options.map((item, index) => {
              return (
                <div className="radio-option" key={index}>
                  <input
                    disabled={isDisabled}
                    type="radio"
                    id={item.value}
                    name={name}
                    value={item.value}
                    checked={item.value === checkedValue}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                  <span> {item.label}</span>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default RadioButton;
