import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isRegistered: false,
    loading: false,
    error: null,
    user : null,
}


const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerStart: (state) => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.isRegistered = true;
            state.user = action.payload;
            state.loading = false;
        },
        registerFail: (state, action) => {
            if (action.payload instanceof Error) {
              state.error = action.payload.message; // Set only the error message
            } else {
              state.error = action.payload; // Set the payload as is
            }
            state.loading = false;
          },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { registerStart, registerSuccess, registerFail, clearError } =
    registerSlice.actions;

export default registerSlice.reducer;
