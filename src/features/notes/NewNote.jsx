import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
export default function NewNote() {
  const users = useSelector(selectAllUsers);
  if(!users.length)return <p>not currently available</p>
  const content = <NewNoteForm users={users}></NewNoteForm>
  return content;
}
