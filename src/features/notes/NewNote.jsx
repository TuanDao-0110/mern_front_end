import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
export default function NewNote() {
  const users = useSelector(selectAllUsers);
  const content = users ? <NewNoteForm users={users}></NewNoteForm> : <p>Loading...</p>;
  return content;
}
