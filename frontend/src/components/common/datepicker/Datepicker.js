import React, { useEffect, useState } from "react";
import classNames from "classnames";
import DatePicker from "react-date-picker";

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
  ...rest
}) => {
  const [localDateState, setLocalDateState] = useState(value);

  useEffect(() => {
    if (value) {
      const [day, month, year] = value.split("/");

      setLocalDateState(new Date(year, month - 1, day));
    } else {
      setLocalDateState(null);
    }
  }, [value]);

  return (
    <div
      className={classNames("date-picker-container", {
        required: required,
      })}
      style={{ width: width > wrapperWidth ? width : wrapperWidth }}
    >
      <label>{label}</label>
      <div
        className={classNames("date-picker-field", className)}
        style={{ width }}
      >
        <div className="date-picker-input">
          <DatePicker
            {...rest}
            value={localDateState}
            format="dd/MM/y"
            onChange={(date) => {
              if (!date) {
                onChange(date);
              } else {
                const formattedDate = new Intl.DateTimeFormat("en-GB").format(
                  date
                );
                onChange(formattedDate);
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
