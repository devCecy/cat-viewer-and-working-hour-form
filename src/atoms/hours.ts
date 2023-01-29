import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

/**
 * hour state
 */
export const hourState = atom({
	key: "hourState",
	default: [
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
	effects_UNSTABLE: [persistAtom],
});

/**
 * 변경중인 hour state
 */
export const temporaryHourState = atom({
	key: "temporaryHourState",
	default: [
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
});

/**
 * 시간 변경 여부 state
 */
export const hourChange = atom({
	key: "hourChange",
	default: false,
});

/**
 * 현재 이벤트가 일어난 인풋
 */
export const currentInputState = atom({
	key: "currentInputState",
	default: {
		targetObj: "mon",
		targetObjIdx: 0,
		targetIdx: 0,
		position: "start",
	},
});

/**
 * 변경중인 hour의 첫시간과 마지막시간을 비교합니다.
 */
export const isTemporaryHourValidState = selector({
	key: "isTemporaryHourValidState",
	get: ({ get }) => {
		const temporaryHour = get(temporaryHourState);
		const currentInput = get(currentInputState);
		const start =
			temporaryHour[currentInput.targetObjIdx].list[
				currentInput.targetIdx
			].start.split(":");
		const end =
			temporaryHour[currentInput.targetObjIdx].list[
				currentInput.targetIdx
			].end.split(":");
		const startHour = Number(start[0]);
		const startMin = Number(start[1]);
		const endHour = Number(end[0]);
		const endMin = Number(end[1]);

		let isValid;

		if (startHour < endHour) return (isValid = true);
		if (startHour > endHour) return (isValid = false);
		if (startHour === endHour) {
			if (startMin < endMin) return (isValid = true);
			if (startMin >= endMin) return (isValid = false);
		}

		return isValid;
	},
});
