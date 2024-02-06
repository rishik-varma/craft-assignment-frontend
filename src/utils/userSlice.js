import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn : localStorage.getItem("user") === null ? false : true,
        user : JSON.parse(localStorage.getItem("user"))
    },
    reducers: {
        login : (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout : (state, action) => {
            state.isLoggedIn = false,
            state.user  = null;
            localStorage.removeItem("user");
        }
    }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;