import React from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";
export default function DashLayout() {
  return (
    <>
      <DashHeader></DashHeader>
      <div className="dash-container">
        <Outlet></Outlet>
      </div>
      <DashFooter></DashFooter>
    </>
  );
}
