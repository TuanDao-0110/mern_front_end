import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// createEntityApdapter ==> set up to ininitial state
const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();
// using apislice that we import ==> now injectEndpoin from original apiSlicer
export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      // 1. query end point to fetch all note.
      query: () => "/notes",
      //   2. status validation ==>
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      //   token tracking valid for 5s
      // keepUnusedDataFor: 5, ==> it will the default for  60s if we dont use it
      //   data receive ==> can achieve though hook
      transformResponse: (responseData) => {
        const loadednotes = responseData?.map((note) => {
          note.id = note._id;
          return note;
        });
        // set to initialState ==> state when getnotes call ==> it will have 2 porperties :
        //      1. first : entities : noteArr[]
        //      2. second: id[] with now is have id setup for each note
        return notesAdapter.setAll(initialState, loadednotes);
      },
      //   tag provides tracking for each note value.
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          // each note now have each providesTag
          return [
            { type: "note", id: "LIST" },
            ...result.ids.map((id) => ({
              type: "note",
              id,
            })),
          ];
        }
      },
    }),
    addNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: {
          id,
        },
      }),
    }),
  }),
});
// call api method
export const { useGetNotesQuery, useAddNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } = noteApiSlice;

// return the query result object:
export const selectnoteResult = noteApiSlice.endpoints.getNotes.select();

// creates memoized selector :==> retrieve data from noteAdapter
const selectnoteData = createSelector(
  selectnoteResult,
  (noteResult) => noteResult.data
  // normalized state object with ids vs entities
);
// getSelector creates these selecotrer and we rename them with aliases using destructuring.
export const {
  selectAll: selectAllnotes,
  selectById: selectnoteById,
  selectIds: selectnoteIds,
  //   pass in selector that returns the notes slice of state.
} = notesAdapter.getSelectors((state) => selectnoteData(state) ?? initialState);
