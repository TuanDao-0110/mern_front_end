import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/auth/authSlice";

// 1 add header for basequery ==> that header will carry with apiSlicer for all API's request:

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
//  now we can use this basequery for our ApiSlicer
// but now we have to take new access token by our refresh cookies

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args);
  //request url, method, body
  // console.log(api);
  // signal , dispatch , getState()
  // console.log(extraOptions);
  // custom like {shout : true}
  let result = await baseQuery(args, api, extraOptions); // this call to check our token still valid
  // console.log(result);
  //  if not ==> we can now move to call it again
  // if you want, hanlde other status codes, too
  if (result?.error?.status === 403) {
    // now we call it again by different http
    // console.log("sending refresh token");
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);
    // console.log(refreshResult);
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // thi only happend when our refresh token expired. ===> that mean it doesnt work any more to generate new Access_Token
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "your login has expired";
        alert('your login expired')
      }
      console.log(refreshResult)
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
