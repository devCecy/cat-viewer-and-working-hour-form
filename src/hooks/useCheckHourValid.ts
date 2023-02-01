import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCheckHourValid = () => {
	const [isTemporaryHourValid, setIsTemporaryHourValid] = useState(true);
	const currentInput = useSelector(
		(state: any) => state.currentInputState.currentInput
	);
	const temporaryHours = useSelector(
		(state: any) => state.temporaryHours.temporaryHours
	);

	useEffect(() => {
		setIsTemporaryHourValid(handleValidHours());

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [temporaryHours]);

	/**
	 * h변경중인 hour의 첫시간과 마지막시간을 비교합니다.
	 * @returns
	 */
	const handleValidHours = () => {
		const start =
			temporaryHours[currentInput.targetObjIdx].list[
				currentInput.targetIdx
			].start.split(":");
		const end =
			temporaryHours[currentInput.targetObjIdx].list[
				currentInput.targetIdx
			].end.split(":");
		const startHour = Number(start[0]);
		const startMin = Number(start[1]);
		const endHour = Number(end[0]);
		const endMin = Number(end[1]);

		let isValid = true;

		if (startHour < endHour) return (isValid = true);
		if (startHour > endHour) return (isValid = false);
		if (startHour === endHour) {
			if (startMin < endMin) return (isValid = true);
			if (startMin >= endMin) return (isValid = false);
		}

		return isValid;
	};

	return isTemporaryHourValid;
};

export default useCheckHourValid;
