import { configureStore } from "@reduxjs/toolkit";
import locale from "./slices/localeSlice";
import ui from "./slices/uiSlice";
import blog from "./slices/blogSlice";
import team from "./slices/teamSlice";
import services from "./slices/servicesSlice";
import subscriptions from "./slices/subscriptionsSlice";

export const store = configureStore({
    reducer: { locale, ui, blog, team, services, subscriptions },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
