import { createSlice } from "@reduxjs/toolkit";

export const hourChangeSlice = createSlice({
	name: "hourChange",
	initialState: { isHourChanged: false },
	reducers: {
		changeHourSaveState: (state) => {
			state.isHourChanged = true;
		},
	},
});

export const { changeHourSaveState } = hourChangeSlice.actions;
export default hourChangeSlice.reducer;
