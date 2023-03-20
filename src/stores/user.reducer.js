import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, setLoading, setError, resetUser } = userSlice.actions;
export const selectCurrentUser= state=>state.auth.currentUser;
export default userSlice.reducer;
