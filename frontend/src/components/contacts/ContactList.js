import React, { useState } from "react";
// import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router-dom";

import { mockData } from "./mock";
import Input from "../common/Input";
import Avatar from "../common/avatar";
import Button from "../common/button";
import SvgIcons from "../common/svgIcons/SvgIcons";
import { DOT_MENU, PHONE, PLUS, SEARCh } from "../../constants/svgIcons";

import "./style.css";

const ListContacts = () => {
  const navigate = useNavigate();
  // TODO
  const [contacts, setContacts] = useState(mockData);

  const [searchValue, setSearchValue] = useState("");

  const _onChange = (value) => {
    setSearchValue(value);
  };

  const _onSearch = () => {
    // TODO search api
    console.log("enter press here! ");
  };

  const _handleKeyPress = (event) => {
    if (event.key === "Enter") {
      _onSearch();
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-body">
        <div className="text-center">
          <h1 style={{ fontSize: "2em", fontWeight: "800" }}>CONTACTS</h1>
          <h6> {contacts.length} contacts found</h6>
        </div>

        <ControlMenu
          searchValue={searchValue}
          _onChange={_onChange}
          _handleKeyPress={_handleKeyPress}
          _onSearch={_onSearch}
          navigate={navigate}
        />

        <div className="contact-list-container">
          {Array.isArray(contacts) && contacts.length ? (
            <div className="contact-list">
              {contacts.map((item, index) => {
                return (
                  <div key={item.id} className="contact-item">
                    <Avatar src={item.image} name={item.name} />
                    <div className="flex justify-items-start items-end grow">
                      <span className="pl-8 pr-2 capitalize text-lg">
                        {item.name}
                      </span>
                      {/* <span className="pl-2 pr-4">
                        {item.phone.mobile ||
                          item.phone.home ||
                          item.phone.work}
                      </span> */}
                    </div>
                    <div className="flex justify-items-center items-center ">
                      {/* <span className="px-2">
                        <SvgIcons
                          name={PHONE}
                          color="white"
                          height={45}
                          width={45}
                        />
                      </span> */}
                      <span
                        className="contact-item-detail-icon"
                        data-tip="Details"
                        onClick={() => {
                          navigate(`/contacts/${item.id}/details`);
                        }}
                      >
                        <SvgIcons
                          name={DOT_MENU}
                          color="white"
                          height={45}
                          width={45}
                        />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div> THIS PLACE IS EMPTIER THAN A DESERT</div>
          )}
        </div>
      </div>
      {/* <ReactTooltip /> */}
    </div>
  );
};

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
        <Button className={"add-btn"}>
          <span
            className=" self-center px-2 cursor-pointer"
            onClick={() => {
              navigate("/contacts/add");
            }}
          >
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

export default ListContacts;
