import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center p-20">
      <img
        src={"https://i.imgflip.com/2adszq.jpg"}
        alt={"empty much doge.jpg"}
      />
      <Button
        className={"my-8"}
        onClick={() => {
          navigate("/contacts");
        }}
      >
        Soo empty! Go Back To Contacts
      </Button>
    </div>
  );
};

export default NotFound;
