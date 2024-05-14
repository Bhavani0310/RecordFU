import React, { useState,useEffect } from "react";
import FormComponent from "./form";
import AdminInstitution from "./Admin";
import currentUserState from "../../store/staff.store";
import { useRecoilState } from "recoil";

const Profile = () => {
  
  const [admin,setAdmin]= useState([false]);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);
  const [active, setActive] = useState("Profile");

  useEffect(()=>{
    if (currentLoggedInUser && currentLoggedInUser.role) {
    setAdmin(currentLoggedInUser.role === "Administrator");
    }
  },[])

  return (
    <div className="d-flex justify-content-between">
      <section
        className="d-flex flex-column align-items-center border p-2 rounded-4"
        style={{ width: "25%", minHeight: "80vh" }}
      >
        <img
          src="/user.png"
          alt=""
          
          className=" mt-2"
          style={{ width: "10vw" }}
        />

        <h3
          className="mt-2 mb-2"
          style={{ fontWeight: "700", fontSize: "19px" }}
        >
          {currentLoggedInUser.name}
        </h3>
        <div style={{ width: "-webkit-fill-available" }}>
          <ul
            className="mt-4 d-flex tw-pl-5 flex-column gap-3 align-items-start"
            style={{ fontSize: "17px", fontWeight: "700" }}
          >
            <li
              onClick={() => setActive("Profile")}
              style={{
                color:
                  active === "Profile"
                    ? "rgba(235, 124, 73, 1) rgba(240, 79, 82, 1)"
                    : "rgba(143, 143, 143, 1)",
              }}
              className="tw-cursor-pointer"
            >
              Profile
            </li>
            {admin && (
              <li
                className="tw-cursor-pointer"
                onClick={() => setActive("Users")}
                style={{
                  color:
                    active === "Users"
                      ? "rgba(235, 124, 73, 1) rgba(240, 79, 82, 1)"
                      : "rgba(143, 143, 143, 1)",
                }}
              >
                Institution Users
              </li>
            )}
          </ul>
        </div>
      </section>

      <section className="tw-pr-5" style={{ width: "70%" }}>
        {active === "Profile" ? <FormComponent /> : <AdminInstitution />}
      </section>
    </div>
  );
};

export default Profile;
