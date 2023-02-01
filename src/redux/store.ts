import { configureStore } from "@reduxjs/toolkit";
import hourChangeReducer from "./counter/hourChangeReducer";
import hoursReducer from "./counter/hoursReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "hours",
	storage,
};

const store = configureStore({
	reducer: {
		hours: persistReducer(persistConfig, hoursReducer),
		hourChange: hourChangeReducer,
	},
});

export default store;

// ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
