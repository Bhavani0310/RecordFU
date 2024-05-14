import React from "react";

import tick from "../../assets/svg/dashboard/tick.svg";
import timer from "../../assets/svg/students/timer.svg";
import achivement from "../../assets/svg/students/achivement.svg";

import ActiveStudents from "../DashboardPage/activeStudents";
import StatsCard from "../PlacementPage/StatsCard";

const Students = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="d-flex flex-column gap-4">
      <h3
        className="text-center"
        style={{ fontSize: "25px", fontWeight: "700" }}
      >
        Search Students
      </h3>
      <section
        className="d-flex w-75 gap-4"
        style={{ margin: "0 auto", alignItems: "stretch", height: "7vh" }}
      >
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Department of Electronics Engineering"
          style={{
            backgroundColor: "rgba(243, 243, 243, 1)",
            borderRadius: "7px",
          }}
        />
        <DropDownComponent value="Batch" />
        <DropDownComponent value="Select Student" />
      </section>
      <h4 style={{ fontSize: "18px", fontWeight: "700" }}>
        Department of Electronics Engineering
      </h4>
      <section className="d-flex gap-4">
        <div style={{ flex: "1" }}>
          <StatsSection />
        </div>
        {/*  */}
        <div className="border tw-rounded-xl" style={{ flex: "1" }}>
          {array.map((item, index) => {
            return <ActiveStudents key={index} />;
          })}
        </div>
      </section>
    </div>
  );
};

function StatsSection() {
  const acquiredSkills = [
    { name: "Python", progress: "80%" },
    { name: "Java", progress: "70%" },
    { name: "C++", progress: "60%" },
    { name: "Javascript", progress: "50%" },
    { name: "React", progress: "40%" },
    { name: "Angular", progress: "30%" },
    { name: "Node", progress: "20%" },
    { name: "Express", progress: "10%" },
    { name: "MongoDB", progress: " 5%" },
    { name: "SQL", progress: " 5%" },
  ];
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
            127
          </h3>
          <p className="tw-text-base tw-font-semibold  tw-capitalize">
            Active Students in Record{" "}
          </p>
        </div>
        <div style={{ flex: "1.5" }}>
          <StatsCard
            value={235}
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
          {acquiredSkills.map((item, index) => (
            <AcquiredSkills key={index} item={item} />
          ))}
        </div>
        <div style={{ flex: "1" }}>
          <StatsCard
            text="Total Interest Based Skills"
            value={83}
            icon={achivement}
            textStyle={"tw-text-base tw-text-gray-500 tw-font-semibold"}
          />
          <StatsCard
            text="Total Role Based Skills"
            value={54}
            icon={achivement}
            textStyle={"tw-text-base tw-text-gray-500 tw-font-semibold"}
          />
        </div>
      </div>
    </section>
  );
}

function AcquiredSkills({ item }) {
  return (
    <div>
      <p>{item.name}</p>
      <div className="d-flex align-items-baseline " style={{ gap: "0.2rem" }}>
        <div
          className="progress rounded-1"
          role="progressbar"
          aria-label="Basic example"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: "100%" }}
        >
          <div className="progress-bar" style={{ width: item.progress }}></div>
        </div>
        <p>{item.progress}</p>
        <img src={tick} alt=""  style={{ height: "2vh" }} />
      </div>
    </div>
  );
}

function DropDownComponent({ value }) {
  return (
    <div class="dropdown">
      <button
        class="btn  dropdown-toggle "
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          backgroundColor: "rgba(243, 243, 243, 1)",
          color: "rgba(133, 133, 133, 1)",
          border: "none",
          height: "-webkit-fill-available",
        }}
      >
        {value ? value : "Select"}
      </button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Students;
