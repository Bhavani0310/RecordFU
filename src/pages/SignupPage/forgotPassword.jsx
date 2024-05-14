import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "./input";
import leftArrow from "../../assets/svg/leftarrow.svg";
import record from "../../assets/svg/record.svg";
import authApi from "../../apis/auth.api";
const ForgotPassword = ({ setForgetPassword }) => {
  const [email, setEmail] = useState(true);
  const [rprEmail, setRprEmail] = useState("");

  const handleResetPassword = () => {
    authApi.resetPassword({
      payload: { email: rprEmail },
      success: (res) => {
        alert("Reset Password Request Success");
        setEmail(false);
      },
      error: (err) => {
        alert(
          err?.response?.data?.message || "Failed to Rest Password Request"
        );
      },
    });
  };

  return (
    <div
      className={`container bg-white position-absolute  top-50 start-50 translate-middle d-flex p-2 rounded-4   border text-black `}
      style={{ width: " -webkit-fill-available" }}
    >
      <div className="d-flex flex-column justify-content-between align-items-start p-4 gap-3 w-100">
        <button
          className="d-flex btn fw-semibold p-2"
          style={{ backgroundColor: "rgba(237, 242, 246, 1)" }}
          onClick={() => setForgetPassword(false)}
        >
          <img src={leftArrow} alt="" className="p-2" />
          Go Back
        </button>
        <section className="d-flex flex-column justify-content-center align-items-center gap-3 mb-5 w-100 mt-2">
          <img src={record} alt="" />
          <h1 style={{ fontSize: "22px", fontWeight: "500" }}>
            Forget Password ?
          </h1>
          {email ? (
            <>
              <p
                className="text-center"
                style={{
                  width: "30vw",
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "rgba(97, 97, 97, 1)",
                }}
              >
                Don't worry! Resetting your password is simple. Just type in the
                email you registered to Record.
              </p>
              <section className="d-flex flex-column justify-content-center align-items-strech w-50">
                <div className="mb-3">
                  <InputComponent
                    value={rprEmail}
                    onChange={(e) => setRprEmail(e.target.value)}
                    onEmailChange={(value) => setRprEmail(value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary fw-semibold p-2"
                  style={{
                    backgroundColor: "rgba(43, 102, 246, 1)",
                    color: "white",
                  }}
                  onClick={handleResetPassword}
                >
                  Send
                </button>
              </section>
              <p style={{ fontSize: "10px", fontWeight: "400" }}>
                Don’t have an account? Contact Administrator
              </p>
            </>
          ) : (
            <>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "rgba(97, 97, 97, 1)",
                }}
              >
                Great, password reset link has been sent to your email.
              </p>
              <section className="d-flex flex-column justify-content-center align-items-strech w-50">
                <button
                  type="button"
                  className="btn btn-primary fw-semibold p-2"
                  style={{
                    backgroundColor: "rgba(43, 102, 246, 1)",
                    color: "white",
                  }}
                  onClick={() => setForgetPassword(false)}
                >
                  Sign In Now
                </button>
              </section>
            </>
          )}
        </section>

        <section
          className="d-flex justify-content-between w-100 mt-2"
          style={{ fontWeight: "500", fontSize: "10px" }}
        >
          <p>Privacy policy</p>
          <p>CopyRights 2022</p>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
