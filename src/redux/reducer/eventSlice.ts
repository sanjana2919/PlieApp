import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventApiItem } from "../type";


export const fetchEvents = createAsyncThunk(
    "events/fetchEvents",
    async (token, { rejectWithValue }) => {
    try {
        const response = await fetch("http://3.7.81.243/projects/plie-api/public/api/events-listing",{
            method: "POST",
        headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}` },
       
        });
        const json = await response.json();
        return json.data.events as EventApiItem[];
    } catch (error: any) {
        
        return rejectWithValue(error.message);
    }
    }
);

interface EventState {
    events: EventApiItem[];
    loading: boolean;
    error: string | null;
}


const initialState: EventState = {
    events: [],
    loading: false,
    error: null,
};


const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
    })
    .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
    })
    .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    });
},
});


export default eventsSlice.reducer;