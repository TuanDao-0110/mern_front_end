import { useRefreshMutation } from "./authApiSlice";
import { selectToken } from "./authSlice";
import usePersit from "../../hooks/usePersist";

import React from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [persist] = usePersit();
  const token = useSelector(selectToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation();
  // isUnitialized ==> that mean refesh fn haven't been called yet
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      //React 18 strict mode
      // to make sure that React strict mode dont render twice
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token ");
        try {
          // const response =
          await refresh();
          //   const {accessToken} = response.data
          // it success ==> it going to set succes true
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    // after useeffect run the 1st time ==> effectRan value set is true ==>
    return () => (effectRan.current = true);
  }, []);

  let content;
  //   persist login ==> that mean when use login vs out
  if (!persist) {
    console.log("no persit");
    content = <Outlet></Outlet>;
  } else if (isLoading) {
    // persist :  yes, token : no
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    // persist : yes, token : no
    console.log("error");
    content = (
      <p className="errmsg">
        {error.data?.message}
        <Link to={"/login"}>please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persit : yes , token :yes
    console.log("success");
    content = <Outlet></Outlet>;
  } else if (token && isUninitialized) {
    // persist : yes, token : yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet></Outlet>;
  }
  return content;
};

export default PersistLogin;
