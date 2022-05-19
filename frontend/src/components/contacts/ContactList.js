import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Avatar from "../common/avatar";
import ControlMenu from "./ControlMenu";
import SvgIcons from "../common/svgIcons/SvgIcons";
import { DOT_MENU, STAR } from "../../constants/svgIcons";
import { getContacts } from "../../services/contacts";

import "./style.css";

const ListContacts = () => {
  const navigate = useNavigate();
  // TODO
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const _getContact = (search_key) => {
    setLoading(true);
    getContacts(search_key)
      .then((res) => {
        setContacts(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    _getContact();
  }, []);

  const _onChange = (value) => {
    setSearchValue(value);
  };

  const _onSearch = () => {
    _getContact(searchValue);
  };

  const _handleKeyPress = (event) => {
    if (event.key === "Enter") {
      _onSearch();
    }
  };

  const _loading = () => {
    return (
      <div
        className="flex justify-center items-center"
        style={{
          padding: "30% 0px",
        }}
      >
        <ReactLoading type={"spin"} color="#fff" className="self-center" />
      </div>
    );
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
        {loading ? (
          _loading()
        ) : (
          <div className="contact-list-container">
            {Array.isArray(contacts) && contacts.length ? (
              <div className="contact-list">
                {contacts.map((item, index) => {
                  return (
                    <div key={item.id} className="contact-item">
                      <Avatar src={item.profile_pic} name={item.full_name} />
                      <div className="flex justify-items-start items-end grow">
                        <span className="pl-8 pr-2 capitalize text-lg">
                          {item.full_name}
                        </span>
                      </div>
                      <div className="flex justify-items-center items-center ">
                        {item?.is_favroite && (
                          <span>
                            <SvgIcons
                              name={STAR}
                              color="yellow"
                              height={30}
                              width={30}
                            />
                          </span>
                        )}
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
              <div className="text-center py-8">
                {" "}
                THIS PLACE IS EMPTIER THAN A DESERT
              </div>
            )}
          </div>
        )}
      </div>

      {/* <ReactTooltip /> */}
    </div>
  );
};

export default ListContacts;
