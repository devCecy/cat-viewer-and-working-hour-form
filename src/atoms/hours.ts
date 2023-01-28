import { atom } from "recoil";
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
