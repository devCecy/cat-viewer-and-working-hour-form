import { createSlice } from "@reduxjs/toolkit";
import { initialHours } from "../../data/hours";

export const HoursSlice = createSlice({
	name: "hours",
	initialState: {
		hourList: initialHours,
	},
	reducers: {
		setHours: (state, action) => ({
			hourList: action.payload,
		}),
	},
});

export const { setHours } = HoursSlice.actions;
export default HoursSlice.reducer;
