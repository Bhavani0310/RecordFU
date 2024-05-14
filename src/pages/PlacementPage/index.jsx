import React from "react";
import { Outlet } from "react-router-dom";
import PlacementHeader from "./PlacementHeader";

const Placement = () => {
  return (
    <div className="tw-bg-white  tw-w-full tw-h-auto">
      {/*  headear */}
      <PlacementHeader />
      {/* placement main page */}
      <Outlet />
    </div>
  );
};

export default Placement;
