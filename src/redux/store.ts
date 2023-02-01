import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import hourChangeReducer from "./reducer/hourChangeReducer";
import hoursReducer from "./reducer/hoursReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import temporaryHoursReducer from "./reducer/temporaryHoursReducer";
import currentInputReducer from "./reducer/currentInputReducer";

const persistConfig = {
	key: "hours",
	storage,
};

const store = configureStore({
	reducer: {
		hours: persistReducer(persistConfig, hoursReducer),
		temporaryHours: temporaryHoursReducer,
		hourChange: hourChangeReducer,
		currentInputState: currentInputReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;

// ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
