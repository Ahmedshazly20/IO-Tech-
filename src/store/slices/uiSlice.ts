import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "ui",
    initialState: { loading: false, toast: null as null | { type: "success" | "error"; message: string } },
    reducers: {
        setLoading(state, action) { state.loading = !!action.payload; },
        setToast(state, action) { state.toast = action.payload; },
        clearToast(state) { state.toast = null; },
    },
});
export const { setLoading, setToast, clearToast } = slice.actions;
export default slice.reducer;
