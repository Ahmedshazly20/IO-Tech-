import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type Locale = "en" | "ar";
interface State { current: Locale }
const initialState: State = { current: "en" };
const slice = createSlice({
    name: "locale",
    initialState,
    reducers: {
        setLocale(state, action: PayloadAction<Locale>) { state.current = action.payload; },
    },
});
export const { setLocale } = slice.actions;
export default slice.reducer;
