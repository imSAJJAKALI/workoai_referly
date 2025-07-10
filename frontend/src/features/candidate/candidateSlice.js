import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCandidatesAPI,
  addCandidateAPI,
  updateCandidateStatusAPI,
  deleteCandidateAPI,
} from "./candidateApi.js";

// ✅ Async thunks
export const fetchCandidates = createAsyncThunk("candidates/fetchAll", fetchCandidatesAPI);
export const addCandidate = createAsyncThunk("candidates/add", addCandidateAPI);
export const updateCandidateStatus = createAsyncThunk("candidates/updateStatus", updateCandidateStatusAPI);
export const deleteCandidate = createAsyncThunk("candidates/delete", deleteCandidateAPI);

// ✅ Slice
const candidateSlice = createSlice({
  name: "candidates",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ADD
      .addCase(addCandidate.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE STATUS
      // Inside candidateSlice.js

.addCase(updateCandidateStatus.fulfilled, (state, action) => {
  const updated = action.payload; // returned from backend
  const index = state.list.findIndex((c) => c._id === updated._id);
  if (index !== -1) {
    state.list[index] = updated; // 🔁 Replace the entire updated object
  }
})


      // DELETE
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      });
  },
});

export default candidateSlice.reducer;
