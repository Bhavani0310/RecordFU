import React, { useState, useEffect } from "react";

import styles from "./profile.module.css";
import penEditIcon from "../../assets/svg/editPenIcon.svg";
import currentUserState from "../../store/staff.store";
import { useRecoilState } from "recoil";
import dashboardApi from "../../apis/dashboard.api";
import institutionApi from "../../apis/institution.api";
const FormComponent = () => {
  const [admin, setAdmin] = useState([false]);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);

  const [userData, SetUserData] = useState({
    fullName: currentLoggedInUser.name ? currentLoggedInUser.name : "",
    mobile: currentLoggedInUser.mobile ? currentLoggedInUser.mobile : "",
    designation: currentLoggedInUser.designation
      ? currentLoggedInUser.designation
      : "",
  });
  const [email, SetEmail] = useState(
    currentLoggedInUser.email ? currentLoggedInUser.email : ""
  );
  const [FullName, SetFullName] = useState(
    currentLoggedInUser.name ? currentLoggedInUser.name : ""
  );
  const [Mobile, SetMobile] = useState(
    currentLoggedInUser.mobile ? currentLoggedInUser.mobile : ""
  );
  const [Designation, setDesignation] = useState(
    currentLoggedInUser.designation ? currentLoggedInUser.designation : ""
  );
  const [key, setKey] = useState(0);
  const staffId = currentLoggedInUser.staffId
    ? currentLoggedInUser.staffId
    : "";
  const departmentId = currentLoggedInUser.departmentId
    ? currentLoggedInUser.departmentId
    : "";
  const [department, setDepartment] = useState();
  useEffect(() => {
    if (currentLoggedInUser && currentLoggedInUser.role) {
      setAdmin(currentLoggedInUser.role === "Administrator");
    }

    SetUserData({
      fullName: FullName,
      mobile: Mobile,
      designation: Designation,
    });
  }, [FullName, Mobile, Designation, currentLoggedInUser]);

  const handleSave = () => {
    const updatedUserData = {
      fullName: FullName,
      mobile: Mobile,
      designation: Designation,
    };

    dashboardApi.updateProfile({
      staffId,
      payload: updatedUserData,
      success: (res) => {
        setKey((prevKey) => prevKey + 1);
        window.location.reload();
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  };

  return (
    <form action="" className={styles.inputBox}>
      <h3 style={{ fontSize: "19px", fontWeight: "700" }}>Profile</h3>
      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <label htmlFor="Email">Full Name</label>
          <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
            <input
              type="text"
              className="form-control"
              id="Email"
              defaultValue={FullName}
              onChange={admin ? (e) => SetFullName(e.target.value) : null}
              disabled={!admin}
            />
            {admin ? (
              <button className="input-control p-3 tw-bg-transparent tw-absolute tw-right-0">
                <img
                  src={penEditIcon}
                  alt="edit icon"
                  className="tw-h-[15px] tw-w-[15px]"
                />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="Role">Role</label>
          <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
            <input
              type="text"
              className="form-control"
              id="Role"
              defaultValue={currentLoggedInUser.role ? currentLoggedInUser.role : null}
            />
          </div>
        </div>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <label htmlFor="Designation">Designation</label>
          <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
            <input
              type="text"
              className="form-control"
              id="Designation"
              defaultValue={Designation}
              onChange={admin ? (e) => setDesignation(e.target.value) : null}
              disabled={!admin}
            />
            {admin ? (
              <button className="input-control p-3 tw-bg-transparent tw-absolute tw-right-0">
                <img
                  src={penEditIcon}
                  alt="edit icon"
                  className="tw-h-[15px] tw-w-[15px]"
                />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="Department">Department</label>
          <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
            <input
              type="text"
              className="form-control"
              id="Department"
              defaultValue={
                currentLoggedInUser.department
                  ? currentLoggedInUser.department
                  : null
              }
            />
          </div>
        </div>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.inputWrapper}>
          <label htmlFor="Mobile">Mobile</label>
          <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
            <input
              type="text"
              className="form-control"
              id="Mobile"
              defaultValue={Mobile}
              onChange={(e) => SetMobile(e.target.value)}
            />
            <button className="input-control p-3 tw-bg-transparent tw-absolute tw-right-0">
              <img
                src={penEditIcon}
                alt=""
                className=" tw-h-[15px] tw-w-[15px]"
              />
            </button>
          </div>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email</label>
          <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
            <input
              type="text"
              className="form-control"
              id="email"
              defaultValue={email}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="col btn tw-float-right tw-px-6 "
          style={{
            color: "white",
            background:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
            border: "none",
            padding: "revert-layer",
            maxWidth: "100px",
          }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
