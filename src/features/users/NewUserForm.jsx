import React from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { useState, useEffect } from "react";

const USER_REGEX = /^[A-z] {3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%] [4,12]$/;

export default function NewUserForm() {
  // use new user
  const [addNewUser, { isLoading, isError, isSuccess, error }] = useAddNewUserMutation();
  // add reacthook
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPwd, setVaidPwd] = useState(false);
  const [roles, setRoles] = useState(["employee"]);
  // use effect to check username vs pwd validate

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);
  useEffect(() => {
    setVaidPwd(PWD_REGEX.test(password));
  }, [password]);
  // after we call ==>  set up to navigate
  useEffect(() => {
    if (isSuccess) {
      setUserName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUserNameChanged = (e) => setUserName(e.target.value);
  const onPwdChanged = (e) => setPassword(e.target.value);
  const onRolesChanged = (e) => {
    // set new Array for radio selector ==> user can cre
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setRoles(values);
  };

  // can save :
  const canSave = [roles.length > 0, validPwd, validUserName].every(Boolean) // && !isLoading;
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ userName, password, roles });
    }
  };

  // create select for roles :

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUserName ? "form__input--incomplete" : "";
  const validPwdClass = !validPwd ? "form__input---incomplete" : "";
  const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : "";
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={userName}
          onChange={onUserNameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input className={`form__input ${validPwdClass}`} id="password" name="password" type="password" value={password} onChange={onPwdChanged} />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:{roles}
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
  return content;
}
