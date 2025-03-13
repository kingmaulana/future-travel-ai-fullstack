import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("user/login", async function ({ email, password }) {
    const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
            email,
            password,
        },
    });
    console.log("🚀 ~ data:", data)

    localStorage.setItem("access_token", data.access_token)

    return data
})

