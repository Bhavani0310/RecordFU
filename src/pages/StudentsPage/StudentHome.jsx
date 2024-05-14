import React from "react";

import StudentHeader from "./StudentHeader";
import { Outlet, useLocation } from "react-router-dom";

const StudentsHome = () => {
  const location = useLocation();

  return (
    <div className="d-flex flex-column gap-4">
      {/* Student Header */}
      {/* hide student header if sub path is profile */}
      {location.pathname === "/students/search" && <StudentHeader />}

      <Outlet />
    </div>
  );
};

export default StudentsHome;
