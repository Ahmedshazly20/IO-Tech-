import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "subscriptions",
    initialState: { emails: [] as string[] },
    reducers: {
        add(state, action) {
            const email = String(action.payload || "").toLowerCase();
            if (email && !state.emails.includes(email)) state.emails.push(email);
        },
    },
});
export const { add } = slice.actions;
export default slice.reducer;
