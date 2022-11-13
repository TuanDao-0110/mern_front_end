import React from "react";
import { Outlet } from "react-router-dom";
import { store } from "../app/store";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";
export default function DashLayout() {
  console.log(store.getState())
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
