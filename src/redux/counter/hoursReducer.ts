import { createSlice } from "@reduxjs/toolkit";

export const HoursSlice = createSlice({
	name: "hours",
	initialState: {
		hourList: [
			{
				id: "mon",
				name: "Monday",
				list: [{ start: "9:00", end: "12:00" }],
			},
			{
				id: "tue",
				name: "Tuesday",
				list: [{ start: "9:00", end: "13:00" }],
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
		setHours: (state, action) => ({
			hourList: action.payload,
		}),
	},
});

export const { setHours } = HoursSlice.actions;
export default HoursSlice.reducer;
