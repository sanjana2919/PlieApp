import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import NavigationService from "../../navigation/NavigationService";
import { screen, stacks } from "../../utility/screens";


interface AuthState {
  userName: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userName: null,
  token: null,
  loading: false,
  error: null,
};

// API call for login
export const loginUser = createAsyncThunk("auth/loginUser",
    async ( { email, password }: { email: string; password: string },
    { rejectWithValue }) => {
    try {
        const response = await fetch("http://3.7.81.243/projects/plie-api/public/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        return rejectWithValue(data.message);
    }

    return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
 logout: (state) => {
      state.userName = null;
      state.token = null;
    },
},
    extraReducers: (builder) => {
        builder
    .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action?.payload?.data?.user?.usr_username;
        state.token = action.payload.token;
        })
    .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;