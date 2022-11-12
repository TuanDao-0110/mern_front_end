import { store } from "../../app/store";
import { noteApiSlice, useGetNotesQuery } from "../notes/noteApiSlicer";
import { userApiSlice } from "../users/usersApiSlice";

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
function Prefetch() {
  useEffect(() => {
    console.log("subscribing");
    // keep data
    const notes = store.dispatch(noteApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(userApiSlice.endpoints.getUsers.initiate());
    // run on unmount
    return () => {
      console.log("unsubcribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  });
  return <Outlet></Outlet>;
}

export default Prefetch;
