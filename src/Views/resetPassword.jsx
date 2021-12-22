import React, { useState, useEffect } from "react";
import { fetch } from "../modules/httpServices";
import { constants } from "../modules/constants";
import eye from "../images/eye.png";
import closedEye from "../images/eye-closed.png";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [didPasswordReset, setdidPasswordReset] = useState(false);
  const [isPasswordVisible, setIfPasswordVisible] = useState(false);

  useEffect(() => {
    const userEmail = window.localStorage.getItem("userEmail");
    setEmail(userEmail);
    props.setIsTicketLoading();
  }, []);

  const isPasswordVisibleHandler = (e) => {
    e.preventDefault();
    setIfPasswordVisible(!isPasswordVisible);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    password === confirmPassword
      ? fetch.post({
          url: constants.SERVICE_URLS.RESET_PASSWORD,
          requestBody: {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
          },
          callbackHandler: (response) => {
            const { status } = response;
            if (status === constants.SUCCESS) {
              setdidPasswordReset(true);
              setTimeout(() => {
                window.localStorage.removeItem("xenieToken");
                window.localStorage.removeItem("userId");
                window.localStorage.removeItem("userEmail");
                window.location = "/";
              }, 1000);
            }
          },
        })
      : alert("Passwords Don't Match!");
  };

  return (
    <div className="reset">
      <form className="reset__form">
        <div className="reset__email--input">
          <input
            className="reset__emailInput reset--input"
            value={email}
            type="email"
            disabled
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="reset__password--input">
          <input
            className="reset__passwordInput reset--input u-margin-left--small"
            type={isPasswordVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="New Password"
          />
          <span className="reset__password--visible">
            <span className="reset__eye-cross--visible"></span>
            {isPasswordVisible ? (
              <img
                className="reset__password-eye--open"
                onClick={(e) => isPasswordVisibleHandler(e)}
                src={eye}
              />
            ) : (
              <img
                className="reset__password-eye--closed"
                onClick={(e) => isPasswordVisibleHandler(e)}
                src={closedEye}
              />
            )}
          </span>
        </div>
        <div className="reset__confirm-password--input">
          <input
            className="reset__passwordInput reset--input"
            type="password"
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            placeholder="Confirm Password"
          />
        </div>
        {didPasswordReset ? (
          <div className="reset__did-Password-Reset">
            <p className="reset__did-Password-Reset--blink">
              Password Reset Successfuly! Redirecting to Login...{" "}
            </p>
          </div>
        ) : null}

        <a
          href="#"
          className="reset__btn reset__btn--white"
          onClick={(e) => formSubmitHandler(e)}
        >
          Reset
        </a>
      </form>
    </div>
  );
};

export default ResetPassword;
