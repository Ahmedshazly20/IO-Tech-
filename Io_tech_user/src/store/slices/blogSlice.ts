import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "blog",
    initialState: { list: [], detail: null as any },
    reducers: {
        setList(state, action) { state.list = action.payload || []; },
        setDetail(state, action) { state.detail = action.payload || null; },
    },
});
export const { setList, setDetail } = slice.actions;
export default slice.reducer;
