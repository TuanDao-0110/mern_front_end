import React from "react";
import { Link } from "react-router-dom";
import { store } from "../../app/store";

export default function Welcome() {
  const date = new Date();
//   create date format
  const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short" }).format(date);
  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Add New techNote</Link>
      </p>

      <p>
        <Link to="/dash/users">View User Settings</Link>
      </p>

      <p>
        <Link to="/dash/users/new">Add New User</Link>
      </p>
    </section>
  );
}
