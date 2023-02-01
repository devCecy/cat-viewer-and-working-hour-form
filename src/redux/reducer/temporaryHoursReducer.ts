import { createSlice } from "@reduxjs/toolkit";
import { initialHours } from "../../data/hours";

export const temporaryHoursSlice = createSlice({
	name: "temporaryHours",
	initialState: {
		temporaryHours: initialHours,
	},
	reducers: {
		setTemporaryHours: (state, action) => ({
			temporaryHours: action.payload,
		}),
	},
});

export const { setTemporaryHours } = temporaryHoursSlice.actions;
export default temporaryHoursSlice.reducer;
