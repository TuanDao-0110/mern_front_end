import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectnoteById } from "./noteApiSlicer";
import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

export default function EditNote() {
  const { id } = useParams();
  const note = useSelector((state) => selectnoteById(state, id));
  const users = useSelector(selectAllUsers);
  const content = note && users ? <EditNoteForm note={note} users={users}></EditNoteForm> : <p>Loading...</p>;
  return content;
}
