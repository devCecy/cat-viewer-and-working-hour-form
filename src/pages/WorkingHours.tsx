import { useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { hourChange, hourState, temporaryHourState } from "../atoms/hours";

// components
import RangeInput from "../components/RangeInput";

// libraries
import { BiTrash } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const WorkingHours = () => {
	const [sectionCollapse, setSectionCollapse] = useState(false);
	const [rangeInputList, setRangeInputList] = useRecoilState(hourState);
	const [isHourChanged, setIsHourChanged] = useRecoilState(hourChange);
	const temporaryHours = useRecoilValue(temporaryHourState);
	const setTemporaryHours = useSetRecoilState(temporaryHourState);

	/**
	 * range input을 추가합니다.
	 * @param e
	 */
	const handleAddRangeInput = (e: any) => {
		if (!e.target.id) return;

		const id = e.target.id.split("-")[0];
		const name = e.target.id.split("-")[1];

		const targetObjIdx = rangeInputList.findIndex(
			(item: any) => item.id === id
		);
		let newArray = [...rangeInputList];
		const newList = [
			...rangeInputList[targetObjIdx]?.list,
			{ start: "9:00", end: "17:00" },
		];

		newArray[targetObjIdx] = {
			id,
			name,
			list: newList,
		};
		setTemporaryHours([...newArray]);
		setRangeInputList([...newArray]);
		setIsHourChanged(true);
	};

	/**
	 *  range input을 삭제합니다.
	 * @param e
	 */
	const handleDeleteRangeInput = (e: any) => {
		if (!e.target.id) return;

		const id = e.target.id.split("-")[0];
		const name = e.target.id.split("-")[1];

		const targetObjIdx = rangeInputList.findIndex(
			(item: any) => item.id === id
		);
		const targetIdx = e.target.tabIndex;

		let newArray = [...rangeInputList];

		const newList = [
			...rangeInputList[targetObjIdx].list.slice(0, targetIdx),
			...rangeInputList[targetObjIdx].list.slice(targetIdx + 1),
		];

		newArray[targetObjIdx] = {
			id,
			name,
			list: newList,
		};

		setTemporaryHours([...newArray]);
		setRangeInputList([...newArray]);
		setIsHourChanged(true);
	};

	/**
	 * 변경된 시간을 업데이트 합니다.
	 */
	const handleUpdate = () => {
		setRangeInputList(temporaryHours);
		window.location.replace("/working-hour");
	};

	return (
		<Container>
			{/* Collapse */}
			<SectionCollapse>
				<h1>select your weekly hours</h1>
				{sectionCollapse ? (
					<MdKeyboardArrowRight
						onClick={() => setSectionCollapse(!sectionCollapse)}
					/>
				) : (
					<MdKeyboardArrowDown
						onClick={() => setSectionCollapse(!sectionCollapse)}
					/>
				)}
			</SectionCollapse>

			{/* rangeInputList */}
			{sectionCollapse ? (
				<div></div>
			) : (
				<>
					{rangeInputList.map((week: any) => {
						return (
							<RangeInputBox key={week.id}>
								<WeekBox id={week.id}>
									<label>{week.name}</label>
									{week?.list.length === 0 && (
										<PlusIconBox>
											<IconBox
												id={`${week.id}-${week.name}`}
												onClick={handleAddRangeInput}
											>
												<GoPlus style={{ pointerEvents: "none" }} />
											</IconBox>
										</PlusIconBox>
									)}
									{week?.list?.length !== 0 && (
										<FlexColumnBox>
											{week?.list?.map((item: any, idx: number) => {
												return (
													<FlexBox
														key={`list-${week.id}-${idx}`}
														style={{ marginBottom: "1.5rem" }}
													>
														<FlexBox>
															<RangeInput
																hourList={item}
																info={[week.id, idx, week.name]}
															/>
															<IconBox
																id={`${week.id}-${week.name}`}
																tabIndex={idx}
																onClick={handleDeleteRangeInput}
															>
																<BiTrash style={{ pointerEvents: "none" }} />
															</IconBox>
														</FlexBox>
														{week?.list?.length === idx + 1 ? (
															<IconBox
																id={`${week.id}-${week.name}`}
																onClick={handleAddRangeInput}
															>
																<GoPlus style={{ pointerEvents: "none" }} />
															</IconBox>
														) : (
															<GoPlus style={{ visibility: "hidden" }} />
														)}
													</FlexBox>
												);
											})}
										</FlexColumnBox>
									)}
								</WeekBox>
							</RangeInputBox>
						);
					})}

					{isHourChanged && (
						<ButtonBox>
							<Button
								props="sencond"
								onClick={() => window.location.replace("/working-hour")}
							>
								Cancel
							</Button>
							<Button props="main" onClick={handleUpdate}>
								Update
							</Button>
						</ButtonBox>
					)}
				</>
			)}
		</Container>
	);
};

export default WorkingHours;

const SectionCollapse = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	border-bottom: 1px solid lightgray;
	padding: 1rem;

	h1 {
		font-size: 1.5rem;
	}
	svg {
		font-size: 2rem;
		cursor: pointer;
	}
`;

const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 38rem;
	column-gap: 1rem;
`;

const FlexColumnBox = styled(FlexBox)`
	flex-direction: column;
`;

const Container = styled.section`
	max-width: 60rem;
	margin: 10rem auto 0;
`;

const WeekBox = styled.div`
	display: flex;
	justify-content: space-between;
	min-height: 5rem;
	max-height: 100vh;
	padding: 1rem 2rem;
	label {
		font-size: 1.8rem;
	}

	svg {
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

const RangeInputBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	border-bottom: 1px solid lightgray;
	padding: 1.5rem 0;
`;

const ButtonBox = styled.div`
	display: flex;
	justify-content: flex-end;
	column-gap: 1rem;
	padding: 2rem 3rem;
`;

const Button = styled.button<{ props: string }>`
	padding: 1rem;
	font-size: 1.5rem;
	border-radius: 0.5rem;

	${(props) =>
		props.props === "main"
			? `color: white; background-color: ${props.theme.colors.primary};`
			: `color:  ${props.theme.colors.primary}; background-color: white;`}
`;

const PlusIconBox = styled.div`
	width: 38rem;
`;

const IconBox = styled.div`
	cursor: pointer;
`;
