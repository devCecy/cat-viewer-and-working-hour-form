import { createSlice } from "@reduxjs/toolkit";

export const currentInputStateSlice = createSlice({
	name: "currentInput",
	initialState: {
		currentInput: {
			targetObj: "mon",
			targetObjIdx: 0,
			targetIdx: 0,
			position: "start",
		},
	},
	reducers: {
		setCurrentInputState: (state, action) => ({
			currentInput: {
				targetObj: action.payload.targetObj,
				targetObjIdx: action.payload.targetObjIdx,
				targetIdx: action.payload.targetIdx,
				position: action.payload.position,
			},
		}),
	},
});

export const { setCurrentInputState } = currentInputStateSlice.actions;
export default currentInputStateSlice.reducer;
