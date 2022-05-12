import React, { useState } from "react";
import Input from "../common/Input";

import "./style.css";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  return (
    <div id="loginform" className="login-container" style={{}}>
      <div className="login-form" style={{}}>
        <div>Login</div>
        <div>
          <form>
            <Input
              placeholder={"Username"}
              value={userName}
              onChange={(value) => {
                setUserName(value);
              }}
              label={"Username"}
              prefix={<span>A</span>}
            />
          </form>
        </div>
      </div>
      {/* <FormHeader title="Login" /> */}
      {/* <Form /> */}
      {/* <OtherMethods /> */}
    </div>
  );
};

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Username"
      placeholder="Enter your username"
      type="text"
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
    />
    <FormButton title="Log in" />
  </div>
);

const FormButton = (props) => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div class="row">
    <label>{props.description}</label>
    <input
      autoComplete="off"
      type={props.type}
      placeholder={props.placeholder}
    />
  </div>
);

export default Login;
