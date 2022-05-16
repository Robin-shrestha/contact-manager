import _isEmpty from "lodash.isempty";
import ReactLoading from "react-loading";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { mockData } from "./mock";
import Avatar from "../common/avatar";
import SvgIcons from "../common/svgIcons/SvgIcons";
import * as svgIcons from "../../constants/svgIcons";

import "./style.css";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [detailState, setDetailState] = useState({});

  useEffect(() => {
    setLoading(true);
    const data = mockData.find((item) => item.id === id);
    setDetailState(data);
    setLoading(false);
    return () => {};
  }, []);

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
                <Avatar src={detailState?.image} name={detailState?.name} />
                <div className="flex justify-center items-center gap-4">
                  {detailState.name}
                  <span
                    className="cursor-pointer"
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
                <div className="flex justify-center gap-4 text-lg	">
                  <div>
                    <span className="font-semibold">Address : </span>
                    {detailState?.address}
                  </div>
                  <div>
                    <span className="font-semibold">Email : </span>
                    {detailState?.email}
                  </div>
                </div>
              </div>
              <div className="mt-4 px-6">
                <h3 className="font-semibold text-xl tex underline underline-offset-2 pb-2">
                  Contacts
                </h3>
                {!_isEmpty(detailState) &&
                  Object.entries(detailState?.phone).map(
                    ([key, value], index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-between gap-4 py-2 text-lg capitalize	"
                        >
                          <div>
                            <span className="font-semibold">{key} : </span>
                            {value}
                          </div>
                          <span className="cursor-pointer">
                            <SvgIcons
                              name={svgIcons.PHONE}
                              color="#69ff63"
                              height={25}
                              width={25}
                            />
                          </span>
                        </div>
                      );
                    }
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
