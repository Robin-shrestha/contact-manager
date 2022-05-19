import React from "react";

import Input from "../common/Input";
import Button from "../common/button";
import SvgIcons from "../common/svgIcons/SvgIcons";
import { PLUS, SEARCh } from "../../constants/svgIcons";

const ControlMenu = ({
  searchValue,
  _onChange,
  _handleKeyPress,
  _onSearch,
  navigate,
}) => {
  return (
    <div className="control-menu">
      <div className="self-center	">
        <Button
          className={"add-btn"}
          onClick={() => {
            navigate("/contacts/add");
          }}
        >
          <span className=" self-center px-2 cursor-pointer">
            <SvgIcons name={PLUS} color="white" height={22} width={22} />
          </span>{" "}
        </Button>
      </div>
      <div className="self-center	px-4">
        <Input
          value={searchValue}
          onChange={_onChange}
          wrapperClassName={"search-wrapper"}
          className={"search"}
          width={"300px"}
          onKeyPress={_handleKeyPress}
          suffix={
            <span
              onClick={_onSearch}
              className="search-btn self-center px-2 cursor-pointer"
            >
              <SvgIcons name={SEARCh} />
            </span>
          }
        />
      </div>
    </div>
  );
};

export default ControlMenu;
