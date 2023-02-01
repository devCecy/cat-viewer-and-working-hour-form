import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import hourChangeReducer from "./counter/hourChangeReducer";
import hoursReducer from "./counter/hoursReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import temporaryHoursReducer from "./counter/temporaryHoursReducer";

const persistConfig = {
	key: "hours",
	storage,
};

const store = configureStore({
	reducer: {
		hours: persistReducer(persistConfig, hoursReducer),
		temporaryHours: temporaryHoursReducer,
		hourChange: hourChangeReducer,
	},
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export default store;

// ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
