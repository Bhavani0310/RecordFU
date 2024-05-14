import React, { useEffect, useState } from "react";
import tick from "../../assets/svg/dashboard/tick.svg";
import timer from "../../assets/svg/students/timer.svg";
import { useRecoilState } from "recoil";
import achievement from "../../assets/svg/students/achivement.svg";
import ActiveStudents from "../DashboardPage/activeStudents";
import StatsCard from "../PlacementPage/StatsCard";
import studentApi from "../../apis/student.api";
import { useParams } from "react-router-dom";
import ModalComponent from "../../components/Modal/ModalComponent";
import authApi from "../../apis/auth.api";
import currentUserState from "../../store/staff.store";

const MostActiveDepartments = () => {
  const { departmentId } = useParams();
  const [departmentData, setDepartmentData] = useState({});
  const [acquiredSkills, setAcquiredSkills] = useState([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] =
    useRecoilState(currentUserState);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    rollNumber: "",
    courseStartYear: "",
    courseEndYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleJob = () => {
    authApi.postAddStudent({
      payload: formData,
      success: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  };

  useEffect(() => {
    if (currentLoggedInUser.role === "Staff") {
      studentApi.getStaffDepartProfile({
        success: (res) => {
          const data = res.data.data;
          setDepartmentData(data);
          setAcquiredSkills(data.skillWithCount);
        },
        error: (err) => {
          alert("Error Occurred Try After Some Time");
        },
      });
    } else {
      studentApi.getDepartProfile({
        departmentId,
        success: (res) => {
          const data = res.data.data;
          setDepartmentData(data);
          setAcquiredSkills(data.skillWithCount);
        },
        error: (err) => {
          alert("Error fetching department data:", err);
        },
      });
    }
  }, [departmentId]);
  return (
    <>
      <div className="d-flex tw-justify-between">
        <h4 style={{ fontSize: "18px", fontWeight: "700" }}>
          {departmentData.departmentName || "Department Name"}
        </h4>
        {"  "}
        <button
          type="button"
           data-bs-toggle="modal"
          data-bs-target="#AddStudent"
          className=" tw-text-white tw-text-base tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
          style={{
            backgroundColor:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",

            background:
              "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
          }}
        >
          Add Students <span className="tw-text-xl">+</span>
        </button>
        {"  "}

        <ModalComponent
          target="AddStudent"
          title="Add Student"
          btn={
            <button
              data-bs-dismiss="modal"
              aria-label="Close"
              className="tw-text-white tw-text-base tw-ml-auto tw-float-right tw-text-center tw-px-4 tw-py-2 tw-rounded-md tw-font-medium"
              style={{
                backgroundColor:
                  "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
                background:
                  "linear-gradient(180deg, #EB7C49 -0.55%, #F04F52 121.03%)",
              }}
              onClick={handleJob}
            >
              Assign Students
            </button>
          }
          btnTitle="Assign Students"
        >
          {/* company name and job Description */}
          <div className="d-flex tw-w-full tw-mb-4 tw-justify-between tw-gap-8">
            <div className="tw-w-full">
              <label
                htmlFor="email"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={formData.email}
                onChange={handleChange}
                placeholder="name@gmail.com"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
            <div className="tw-w-full">
              <label
                htmlFor="fullName"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                defaultValue={formData.fullName}
                onChange={handleChange}
                placeholder="Raju"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
          </div>

          <div className="d-flex tw-w-full tw-mb-4 tw-justify-between tw-gap-8">
            <div className="tw-w-full">
              <label
                htmlFor="rollNumber"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                Roll Number
              </label>

              <input
                type="text"
                name="rollNumber"
                defaultValue={formData.rollNumber}
                onChange={handleChange}
                placeholder="198D4"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
            <div className="tw-w-full">
              <label
                htmlFor="courseStartYear"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                course Start Year
              </label>
              <input
                type="number"
                name="courseStartYear"
                defaultValue={formData.courseStartYear}
                onChange={handleChange}
                placeholder="2024"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
          </div>

          <div className="d-flex tw-w-full tw-mb-4 tw-justify-between tw-gap-8">
            <div className="tw-w-full">
              <label
                htmlFor="courseEndYear"
                className="tw-text-[#8F8F8F] tw-font-medium tw-mb-1"
              >
                course End Year
              </label>
              <input
                type="number"
                name="courseEndYear"
                defaultValue={formData.courseEndYear}
                onChange={handleChange}
                placeholder="2026"
                className="form-control"
                style={{
                  backgroundColor: "rgba(243, 243, 243, 1)",
                  borderRadius: "7px",
                }}
              />
            </div>
          </div>
        </ModalComponent>
        <select
          className="tw-text-right tw-text-[#858585] tw-border-none tw-outline-none"
          name="sort"
          id="sort"
        >
          <option defaultValue="Date created" selected>
            Roll Number
          </option>
          <option defaultValue="Name">Name</option>
          <option defaultValue="Recently">Recently</option>
        </select>
      </div>

      <section className="d-flex gap-4">
        <div style={{ flex: "1" }}>
          <StatsSection departmentData={departmentData} />
        </div>

        {/*  */}
        <div className="border tw-rounded-xl" style={{ flex: "1" }}>
          {departmentData.studentDetails?.map((student) => (
            <ActiveStudents
              key={student.studentId}
              {...student}
              path={"/students/profile"}
            />
          ))}
        </div>
      </section>
    </>
  );
};

function StatsSection({ departmentData }) {
  return (
    <section
      className="d-flex flex-column border gap-3 tw-rounded-xl"
      style={{ padding: "1rem " }}
    >
      <div className="d-flex justify-content-between">
        <div style={{ flex: "1" }} className="p-2 mt-2 ">
          <h3
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
            className="gradiant-color tw-text-[40px] gradiant-color   tw-font-extrabold"
          >
            {departmentData.activeStudents || 0}
          </h3>
          <p className="tw-text-base tw-font-semibold  tw-capitalize">
            Active Students in Record{" "}
          </p>
        </div>
        <div style={{ flex: "1.5" }}>
          <StatsCard
            value={departmentData.totalMontlyHoursOfInvolvement || 0}
            text="Total monthly hours of Involvement"
            textStyle={"tw-text-base tw-font-semibold"}
            icon={timer}
          />
        </div>
      </div>
      <h5 className="tw-capitalize tw-text-lg tw-font-semibold">
        Most Acquired Skills
      </h5>
      <div className="d-flex gap-3">
        <div
          className="border p-3 rounded-3 mb-3"
          style={{ maxHeight: "50vh", overflow: "auto", flex: "1.3" }}
        >
          {departmentData.skillWithCount &&
            Object.entries(departmentData.skillWithCount).map(
              ([skillName, percentage], index) => (
                <AcquiredSkills
                  key={index}
                  skillName={skillName}
                  percentage={percentage}
                />
              )
            )}
        </div>
        <div style={{ flex: "1" }}>
          <StatsCard
            text="Total Interest Based Skills"
            value={departmentData.totalInterestBasedSkills || 0}
            icon={achievement}
            textStyle={"tw-text-base tw-text-gray-500 tw-font-semibold"}
          />
          <StatsCard
            text="Total Role Based Skills"
            value={departmentData.totalRoleBasedSkills || 0}
            icon={achievement}
            textStyle={"tw-text-base tw-text-gray-500 tw-font-semibold"}
          />
        </div>
      </div>
    </section>
  );
}

function AcquiredSkills({ skillName, percentage }) {
  return (
    <div>
      <p>{skillName}</p>
      <div className="d-flex align-items-baseline " style={{ gap: "0.2rem" }}>
        <div
          className="progress rounded-1"
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "100%" }}
        >
          <div
            className="progress-bar"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p>{percentage}%</p>
        <img src={tick} alt="Completed" style={{ height: "2vh" }} />
      </div>
    </div>
  );
}
export default MostActiveDepartments;
