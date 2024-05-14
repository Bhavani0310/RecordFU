import React, { useState, useEffect } from "react";
import styles from "./institution.module.css";
import AdminDepartments from "./Admin";
import penEditIcon from "../../assets/svg/editPenIcon.svg";
import currentUserState from "../../store/staff.store";
import { useRecoilState } from "recoil";
import institutionApi from "../../apis/institution.api";
const Instituion = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);
  const [admin, setAdmin] = useState([false]);
  const [active, setActive] = useState("institutionProfile");

  const [profile, setProfile] = useState([]);
  useEffect(() => {
    if (currentLoggedInUser && currentLoggedInUser.role) {
      setAdmin(currentLoggedInUser.role === "Administrator");
    }
    institutionApi.getInstitutionProfile({
      success: (res) => {
        setProfile(res.data.data);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, []);

  return (
    <div className="d-flex justify-content-between">
      <section
        className="d-flex flex-column align-items-center border p-4 rounded-4"
        style={{ width: "25%", minHeight: "80vh" }}
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(243, 243, 243, 1)",
            borderRadius: "50%",
            padding: "1.5rem",
            width: "9vw",
          }}
        >
          <img
            src="/colleageLogo.png"
            alt=""
            className=" mt-2"
            style={{ width: "4vw" }}
          />
        </div>
        <h3
          className="mt-2 mb-2"
          style={{ fontWeight: "700", fontSize: "19px" }}
        >
          {profile.name}
        </h3>
        <div style={{ width: "-webkit-fill-available" }}>
          <ul
            className="mt-4 d-flex tw-pl-5 flex-column gap-3 align-items-start"
            style={{ fontSize: "17px", fontWeight: "700" }}
          >
            <li
              onClick={() => setActive("institutionProfile")}
              style={{
                color:
                  active === "institutionProfile"
                    ? "rgba(235, 124, 73, 1) rgba(240, 79, 82, 1)"
                    : "rgba(143, 143, 143, 1)",
              }}
              className="tw-cursor-pointer"
            >
              Institution Profile
            </li>
            {admin && (
              <li
                className="tw-cursor-pointer"
                onClick={() => setActive("departments")}
                style={{
                  color:
                    active === "departments"
                      ? "rgba(235, 124, 73, 1) rgba(240, 79, 82, 1)"
                      : "rgba(143, 143, 143, 1)",
                }}
              >
                Departments
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="tw-pr-5" style={{ width: "70%" }}>
        {active === "institutionProfile" ? (
          profile.email ? (
            <FormComponent details={profile} admin={admin} />
          ) : (
            ""
          )
        ) : (
          <AdminDepartments />
        )}
      </section>
    </div>
  );
};

function FormComponent({ details, admin }) {
  const [userData, setUserData] = useState({
    name: "",
    type: "",
    mobile: "",
    email: "",
    about: "",
  });
  const [institutionName, setInstitutionName] = useState(details.name || "");
  const [institutionType, setInstitutionType] = useState(
    details.type ? details.type : "Select"
  );
  const [establishedMonth, setEstablishedMonth] = useState("Month");
  const [establishedYear, setEstablishedYear] = useState("");
  const [address, setAddress] = useState(details.address || "");
  const [contact, setContact] = useState(details.mobile || "");
  const [email, setEmail] = useState(details.email ? details.email.trim() : "");
  const [about, setAbout] = useState(details.about || "");

  const [key, setKey] = useState(0);
  useEffect(() => {
    const date = new Date(details.establishedDate);
    setEstablishedMonth(date.toLocaleString("default", { month: "short" }));
    setEstablishedYear(date.getFullYear().toString());
  }, []);

  useEffect(() => {
    setUserData({
      name: institutionName,
      type: institutionType,
      mobile: contact,
      email,
      about,
    });
  }, []);

  const updateProfile = () => {
    institutionApi.putInstitutionProfile({
      payload: userData,
      success: (res) => {
        setKey((prevKey) => prevKey + 1);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  };
  return (
    <form className={`row g-3 ${styles.fromWrapper}`}>
      <h5 style={{ fontSize: "19px", fontWeight: "700" }}>
        Institution Profile
      </h5>

      <div className="col-md-6">
        <label htmlFor="institutionName" className="form-label tw-p-0 tw-m-0">
          Institution Name
        </label>
        <div className="form-group d-flex tw-relative tw-items-center tw-justify-center">
          <input
            type="text"
            className="form-control"
            id="institutionName"
            value={institutionName}
            onChange={admin ? (e) => setInstitutionName(e.target.value) : null}
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

      <div className="col-md-6">
        <label htmlFor="institutionType" className="form-label tw-p-0 tw-m-0">
          Institution Type
        </label>
        <select
          id="institutionType"
          className="tw-bg-[#F3F3F3] tw-border tw-mt-2 tw-border-gray-300 tw-text-black tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
          tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-full tw-pr-3 tw-font-semibold"
          value={institutionType}
          onChange={(e) => setInstitutionType(e.target.value)}
          disabled={!admin}
        >
          <option value="Select">Select</option>
          <option value="State Government University">
            State Government University
          </option>
          <option value="Deemed/Private University">
            Deemed/Private University
          </option>
          <option value="Central Government University">
            Central Government University
          </option>
          <option value="Institutes of National Importance">
            Institutes of National Importance
          </option>
          <option value="Autonomous college">Autonomous College</option>
        </select>
      </div>

      <div className="col-md-3">
        <label htmlFor="establishedMonth" className="form-label ">
          Established On
        </label>
        <input
          type="text"
          className="form-control"
          id="establishedMonth"
          value={establishedMonth}
        />
      </div>

      <div className="col-md-3 d-flex align-items-end">
        <input
          type="number"
          placeholder="Year"
          value={establishedYear}
          className="form-control tw-font-semibold tw-border tw-mt-2 tw-border-gray-300 tw-text-black tw-text-md tw-rounded-lg tw-focus:ring-blue-500 
 tw-focus:border-blue-500 tw-block tw-p-2.5 tw-w-full tw-pr-3"
          style={{ color: "#858585" }}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="institutionAddress" className="form-label">
          Institution Address
        </label>
        <input
          type="text"
          className="form-control"
          id="institutionAddress"
          value={address}
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="contact" className="form-label">
          Contact
        </label>
        <div className="form-group d-flex d-flex tw-relative tw-items-center tw-justify-center">
          <input
            type="text"
            className="form-group"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            disabled={!admin}
          />
          {admin ? (
            <button className="input-control p-3 tw-bg-transparent tw-absolute tw-right-0">
              <img
                src={penEditIcon}
                alt=""
                className=" tw-h-[15px] tw-w-[15px]"
              />
            </button>
          ) : null}
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="institutionEmail" className="form-label">
          Institution Email
        </label>
        <div className="form-group d-flex d-flex tw-relative tw-items-center tw-justify-center">
          <input
            type="text"
            className="form-group "
            id="institutionEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!admin}
          />
          {admin ? (
            <button className="input-control p-3 tw-bg-transparent tw-absolute tw-right-0">
              <img
                src={penEditIcon}
                alt=""
                className="tw-h-[15px] tw-w-[15px]"
              />
            </button>
          ) : null}
        </div>
      </div>

      <div className="col-12">
        <label htmlFor="about" className="form-label">
          About the Institution
        </label>
        <textarea
          id="about"
          className="form-control"
          rows="3"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          disabled={!admin}
        />
      </div>

      <div className="col-12 d-flex justify-content-end">
        {admin ? (
          <button
            type="button"
            className="btn tw-px-6"
            style={{
              color: "white",
              background:
                "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
              border: "none",
              maxWidth: "200px",
            }}
            onClick={updateProfile} // Add your save logic here
          >
            Save
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default Instituion;
