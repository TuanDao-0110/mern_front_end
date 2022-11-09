import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { selectUserById } from "./usersApiSlice";

export default function EditUser() {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));
  const content = user ? <EditUserForm user={user}></EditUserForm> : <p>Loading...</p>;
  return content;
}
