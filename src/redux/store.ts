import { configureStore } from "@reduxjs/toolkit";
import hourChangeReducer from "./counter/hourChangeReducer";

const store = configureStore({
	reducer: {
		hourChange: hourChangeReducer,
	},
});

export default store;

// ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
