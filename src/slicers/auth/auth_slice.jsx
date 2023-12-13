import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
        },
        authSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        authFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        authLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.isAdmin = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        updatePembelian: (state, action) => {
            state.user.id_pembelian = action.payload;
        },
        updateProfile: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { authStart, authSuccess, authFail, authLogout, clearError, updatePembelian,updateProfile } =
    authSlice.actions;

    export default authSlice.reducer;