import React, { useState, useEffect } from "react";
import ActiveStudents from "../DashboardPage/activeStudents";
import timer from "../../assets/svg/students/timer.svg";
import studentApi from "../../apis/student.api";

const BestPerformingStudents = () => {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState([]);
  useEffect(() => {
    studentApi.getBestStudents({
      success: (res) => {
        const bestStudents = res.data.data.bestPerformingStudents || [];
        setStudents(bestStudents);
        const mostActiveDepart = res.data.data.mostActiveDepartments || [];
        setDepartment(mostActiveDepart);
      },
      error: (err) => {
        alert("Error Occurred Try After Some Time");
      },
    });
  }, []);
  return (
    <div className="d-flex tw-justify-between gap-4 tw-mt-4">
      {/* Best Performing Students */}
      <div className="tw-flex-1">
        <h4 style={{ fontSize: "19px", fontWeight: "700" }}>
          Best Performing Students
        </h4>
        <div
          className="border tw-mt-4 tw-rounded-xl tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-scroll"
          style={{ flex: "1" }}
        >
          {students.map((item, index) => {
            return (
              <ActiveStudents
                key={index}
                {...item}
                path={"/students/profile"}
              />
            );
          })}
        </div>
      </div>
      {/* Most Active Departments */}
      <div className="tw-flex-1">
        <h4 style={{ fontSize: "19px", fontWeight: "700" }}>
          Most Active Departments
        </h4>
        <div
          className="border tw-mt-4 tw-rounded-xl tw-max-h-[400px] tw-overflow-hidden tw-overflow-y-scroll"
          style={{ flex: "1" }}
        >
          {department.map((item, index) => {
            return (
              <ActiveStudents
                key={index}
                {...item}
                icon={timer}
                path={"/students/department"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BestPerformingStudents;
