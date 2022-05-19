import _isEmpty from "lodash.isempty";
import ReactLoading from "react-loading";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Avatar from "../common/avatar";
import Button from "../common/button";
import SvgIcons from "../common/svgIcons/SvgIcons";
import * as svgIcons from "../../constants/svgIcons";

import "./style.css";
import { getContact } from "../../services/contacts";
import classNames from "classnames";
import moment from "moment";
import { DATE_FORMAT } from "../../constants/constants";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [detailState, setDetailState] = useState({});

  useEffect(() => {
    _initialize();
  }, []);

  const _initialize = () => {
    setLoading(true);
    getContact(id)
      .then((res) => {
        setDetailState(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const getDescription = (label, value, isPhoneNumber = false) => {
    if (isPhoneNumber && !value) return null;
    return (
      <div
        className={classNames("mb-1 flex justify-between", {
          "mb-3": isPhoneNumber,
        })}
      >
        <div>
          <span className="font-semibold">{label} : </span>
          {value || "-"}
        </div>
        {isPhoneNumber && (
          <span className="cursor-pointer">
            <SvgIcons
              name={svgIcons.PHONE}
              color="#69ff63"
              height={24}
              width={24}
            />
          </span>
        )}
      </div>
    );
  };
  return (
    <div className="contact-container">
      <div className="contact-body">
        <div className="contact-detail-body">
          {loading ? (
            <div
              className="flex justify-center items-center"
              style={{
                padding: "30% 0px",
              }}
            >
              <ReactLoading
                type={"spin"}
                color="#fff"
                className="self-center"
              />
            </div>
          ) : (
            <>
              <div className="header">
                <Avatar
                  src={detailState?.image}
                  name={detailState?.full_name}
                />
                <div className="flex justify-center items-center gap-4">
                  {detailState?.is_favroite && (
                    <span>
                      <SvgIcons
                        name={svgIcons.STAR}
                        color="yellow"
                        height={30}
                        width={30}
                      />
                    </span>
                  )}
                  {detailState?.full_name}
                  <span
                    className="cursor-pointer edit-icon"
                    onClick={() => {
                      navigate(`/contacts/${id}/edit`);
                    }}
                  >
                    <SvgIcons
                      name={svgIcons.EDIT}
                      color="#ddd"
                      height={25}
                      width={25}
                    />
                  </span>
                </div>
              </div>
              <div>
                <div className="px-8">
                  {getDescription("Address", detailState?.address)}
                  {getDescription("Email", detailState?.email)}
                  {getDescription("Gender", detailState?.gender)}
                  {getDescription(
                    "Date Of Birth",
                    detailState?.date_of_birth &&
                      moment(detailState?.date_of_birth).format(DATE_FORMAT)
                  )}

                  <div>
                    <h3 className="font-bold text-xl mb-2 mt-4">Contacts:</h3>
                    {getDescription(
                      "Mobile number",
                      detailState?.mobile_number,
                      true
                    )}
                    {getDescription(
                      "Home number",
                      detailState?.home_number,
                      true
                    )}
                    {getDescription(
                      "Work number",
                      detailState?.work_number,
                      true
                    )}
                  </div>
                  <div className="text-right my-6">
                    <Button
                      className={"back-btn"}
                      onClick={() => navigate("/contacts")}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
