import { createSlice } from "@reduxjs/toolkit";

export const temporaryHoursSlice = createSlice({
	name: "temporaryHours",
	initialState: {
		temporaryHours: [
			{
				id: "mon",
				name: "Monday",
				list: [{ start: "9:00", end: "17:00" }],
			},
			{
				id: "tue",
				name: "Tuesday",
				list: [{ start: "9:00", end: "17:00" }],
			},
			{
				id: "wed",
				name: "Wednesday",
				list: [{ start: "9:00", end: "17:00" }],
			},
			{
				id: "thu",
				name: "Thursday",
				list: [{ start: "9:00", end: "17:00" }],
			},
			{
				id: "fri",
				name: "Firday",
				list: [{ start: "9:00", end: "17:00" }],
			},
			{
				id: "sat",
				name: "Saturday",
				list: [],
			},
			{
				id: "sun",
				name: "Sunday",
				list: [],
			},
		],
	},
	reducers: {
		setTemporaryHours: (state, action) => ({
			temporaryHours: action.payload,
		}),
	},
});

export const { setTemporaryHours } = temporaryHoursSlice.actions;
export default temporaryHoursSlice.reducer;
