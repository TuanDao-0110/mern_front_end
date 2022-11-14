import React from "react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSendLogOutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USER_REGEX = /^\/dash\/users(\/)?$/;
export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogOut, { isLoading, isSuccess, isError, error }] = useSendLogOutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  const onLogoutClicked = () => sendLogOut();
  if (isLoading) return <p>Logging out...</p>;
  if (isError) return <p>Error : {error.data?.message}</p>;

  let dashClass = null;
  if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USER_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small";
  }
  const logoutButton = (
    <button className="icon-button" title="logout" onClick={onLogoutClicked}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add nav buttons later */}
          {logoutButton}
          </nav>
      </div>
    </header>
  );
}
