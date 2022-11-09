import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// createEntityApdapter ==> set up to ininitial state
const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();
// using apislice that we import ==> now injectEndpoin from original apiSlicer
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      // 1. query end point to fetch all user.
      query: () => "/users",
      //   2. status validation ==>
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   token tracking valid for 5s
      keepUnusedDataFor: 5,
      //   data receive ==> can achieve though hook
      transformResponse: (responseData) => {
        const loadedUsers = responseData.users?.map((user) => {
          user.id = user._id;
          return user;
        });
        // set to initialState ==> state when getUsers call ==> it will have 2 porperties :
        //      1. first : entities : userArr[]
        //      2. second: id[] with now is have id setup for each user
        return userAdapter.setAll(initialState, loadedUsers);
      },
      //   tag provides tracking for each user value.
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          // each user now have each providesTag
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({
              type: "User",
              id,
            })),
          ];
        }
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/user",
        method: "PATCH",
        body: { ...initialUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/user",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});
// call api method
export const { 
  useGetUsersQuery, 
  useAddNewUserMutation, 
  useDeleteUserMutation, 
  useUpdateUserMutation 
} = userApiSlice;

// return the query result object: select() is offer by endpoints which provides:
// type EndpointLogic = {
//   initiate: InitiateRequestThunk
//   select: CreateCacheSelectorFactory
//   matchPending: Matcher<PendingAction>
//   matchFulfilled: Matcher<FulfilledAction>
//   matchRejected: Matcher<RejectedAction>
// }
//

// ---------------------------------------
// from the step below ==> it help to retrive data which is create by using createEnityAdapter
export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

// creates memoized selector :==> retrieve data from userAdapter
const selectUserData = createSelector(
  // create cacheSelector factory
  selectUsersResult,
  (userResult) => userResult.data
  // normalized state object with ids vs entities
);
// getSelector creates these selecotrer and we rename them with aliases using destructuring.
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  //   pass in selector that returns the users slice of state.
} = userAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
