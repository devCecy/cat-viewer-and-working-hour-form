import { useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hours } from "../data/hours";
import { hourChange, hourState, temporaryHourState } from "../atoms/hours";
import { IoMdArrowDropdown } from "react-icons/io";

const SelectorInput = ({ hour, info, position }: any) => {
	const [isInputSelected, setIsInputSelected] = useState(false);
	const [selectedHour, setSelectedHour] = useState(hour);
	const setIsHourChanged = useSetRecoilState(hourChange);
	const rangeInputList = useRecoilValue(hourState);
	const setTemporaryHours = useSetRecoilState(temporaryHourState);

	const handleSelectHour = (e: any) => {
		setSelectedHour(e.target.id);
		setIsInputSelected(!isInputSelected);
		setIsHourChanged(true);

		const targetObjIdx = rangeInputList.findIndex(
			(item: any) => item.id === info[0]
		);

		const targetIdx = info[1];

		let newArray = [...rangeInputList];
		let newList = [...rangeInputList[targetObjIdx].list];
		newList[targetIdx] =
			position === "start"
				? {
						start: e.target.id,
						end: newList[targetIdx].end,
				  }
				: {
						start: newList[targetIdx].start,
						end: e.target.id,
				  };

		newArray[targetObjIdx] = {
			id: info[0],
			name: info[2],
			list: newList,
		};
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
	box-shadow: 5px 5px 5px lightgray;
	overflow: scroll;
	z-index: 999;
	border: 0.5px solid #f7f7f7;
	border-radius: 0.5rem;

	li {
		font-size: 2rem;
		padding: 1rem;
		border-radius: 0.5rem;
		cursor: pointer;

		&:hover {
			background-color: lightgray;
		}
	}
`;
