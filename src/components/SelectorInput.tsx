import { useEffect, useState } from "react";
import styled from "styled-components";
import { hours } from "../data/hours";

// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	currentInputState,
	hourChange,
	temporaryHourState,
} from "../atoms/hours";

// library
import { IoMdArrowDropdown } from "react-icons/io";

interface SelectorInputProps {
	hour: string;
	info: [string, number, string];
	position: "start" | "end";
}

const SelectorInput = ({ hour, info, position }: SelectorInputProps) => {
	const [selectedHour, setSelectedHour] = useState(hour);
	const setIsHourChanged = useSetRecoilState(hourChange);
	const [temporaryHours, setTemporaryHours] =
		useRecoilState(temporaryHourState);
	const setCurrentInputState = useSetRecoilState(currentInputState);
	const [isInputSelected, setIsInputSelected] = useState(false);

	useEffect(() => {
		setSelectedHour(hour);
	}, [hour]);

	/**
	 * 시간을 선택하면, temporaryHourState를 업데이트합니다.
	 * @param e
	 */
	const handleSelectHour = (e: React.MouseEvent<HTMLLIElement>) => {
		setSelectedHour(e.currentTarget.id);
		setIsInputSelected(!isInputSelected);
		setIsHourChanged(true);

		// 요일 인덱스
		const targetObjIdx = temporaryHours.findIndex(
			(item: any) => item.id === info[0]
		);

		// range input의 인덱스
		const targetIdx = info[1];

		let newArray = [...temporaryHours];
		let newList = [...temporaryHours[targetObjIdx].list];
		newList[targetIdx] =
			position === "start"
				? {
						start: e.currentTarget.id,
						end: newList[targetIdx].end,
				  }
				: {
						start: newList[targetIdx].start,
						end: e.currentTarget.id,
				  };

		newArray[targetObjIdx] = {
			id: info[0],
			name: info[2],
			list: newList,
		};

		setCurrentInputState({
			targetObj: info[0],
			targetObjIdx,
			targetIdx,
			position,
		});

		setTemporaryHours(newArray);
	};

	return (
		<Container>
			<SelectorInputBox>
				<IoMdArrowDropdown
					onClick={() => setIsInputSelected(!isInputSelected)}
				/>
				<SelectInput
					readOnly
					value={selectedHour}
					onClick={() => setIsInputSelected(!isInputSelected)}
				/>
			</SelectorInputBox>

			{isInputSelected && (
				<SelectList>
					{hours.map((hour) => {
						return (
							<li key={hour} id={hour} onClick={handleSelectHour}>
								{hour}
							</li>
						);
					})}
				</SelectList>
			)}
		</Container>
	);
};

export default SelectorInput;

const Container = styled.div`
	position: relative;
	width: 15rem;
	height: 5rem;

	@media screen and (max-width: 500px) {
		width: 13rem;
	}
`;

const SelectorInputBox = styled.div`
	position: relative;
	height: 100%;

	svg {
		font-size: 2rem;
		position: absolute;
		top: 1rem;
		right: 0.5rem;
		z-index: 1;
		cursor: pointer;
	}
`;
const SelectInput = styled.input`
	width: 100%;
	position: absolute;
	top: 0;
	padding: 1rem;
	border: 1px solid gray;
	border-radius: 0.5rem;
	background-color: white;
	cursor: pointer;
	font-size: 2rem;
`;

const SelectList = styled.ul`
	position: absolute;
	top: 5rem;
	width: 100%;
	height: 20rem;
	padding: 1rem;
	background-color: white;
	box-shadow: 5px 5px 5px ${({ theme }) => theme.colors.lightgray};
	overflow: scroll;
	z-index: 999;
	border: 0.5px solid ${({ theme }) => theme.colors.lightgray};
	border-radius: 0.5rem;

	li {
		font-size: 2rem;
		padding: 1rem;
		border-radius: 0.5rem;
		cursor: pointer;

		&:hover {
			background-color: ${({ theme }) => theme.colors.lightgray};
		}
	}
`;
