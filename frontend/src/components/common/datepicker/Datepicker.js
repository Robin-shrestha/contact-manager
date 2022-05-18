import React, { useEffect, useState } from "react";
import classNames from "classnames";
import DatePicker from "react-date-picker";
import moment from "moment";

import "./style.css";

const Datepicker = ({
  value,
  onChange,
  label,
  wrapperWidth = "144px",
  width = "144px",
  className,
  wrapperClassName,
  icon,
  placeholder,
  required,
  isDisabled,
  ...rest
}) => {
  const [localDateState, setLocalDateState] = useState(value);

  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split("-");

      setLocalDateState(new Date(year, month - 1, day));
    } else {
      setLocalDateState(null);
    }
  }, [value]);

  return (
    <div
      className={classNames("input-field-container", wrapperClassName, {
        required: required,
        disabled: isDisabled,
      })}
      style={{ width: width > wrapperWidth ? width : wrapperWidth }}
    >
      {label && <label>{label}</label>}
      <div
        className={classNames("date-picker-field", className)}
        style={{ width }}
      >
        <div className="date-picker-input">
          <DatePicker
            {...rest}
            disabled={isDisabled}
            value={localDateState}
            format="y-MM-dd"
            onChange={(date) => {
              if (!date) {
                onChange(date);
              } else {
                onChange(moment(date).format("YYYY-MM-DD"));
              }
            }}
            className={classNames("date-picker-field", className)}
          />
        </div>
      </div>
    </div>
  );
};

export default Datepicker;
