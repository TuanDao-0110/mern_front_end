import React from "react";
import { Link } from "react-router-dom";
import { store } from "../../app/store";

export default function Welcome() {
  const date = new Date();
//   create date format

console.log(store.getState())
  const today = new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short" }).format(date);
  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>welcome</h1>
      <p>
        <Link to="/dash/notes">view techNotes </Link>
      </p>
      <p>
        <Link to="/dash/users">view user setting </Link>
      </p>
    </section>
  );
}
