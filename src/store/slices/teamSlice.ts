import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "team",
    initialState: { list: [] as any[] },
    reducers: {
        setList(state, action) { state.list = action.payload || []; },
    },
});
export const { setList } = slice.actions;
export default slice.reducer;
