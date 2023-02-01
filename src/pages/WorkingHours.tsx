import React, { useEffect, useState } from "react";
import styled from "styled-components";

// recoil
import { useRecoilValue } from "recoil";
import { isTemporaryHourValidState } from "../atoms/hours";

// components
import RangeInput from "../components/RangeInput";

// libraries
import { BiTrash } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

// redux
import { useDispatch, useSelector } from "react-redux";
import { changeHourSaveState } from "../redux/counter/hourChangeReducer";
import { setHours } from "../redux/counter/hoursReducer";
import { setTemporaryHours } from "../redux/counter/temporaryHoursReducer";

const WorkingHours = () => {
	const dispatch = useDispatch();
	const isHourChanged = useSelector(
		(state: any) => state.hourChange.isHourChanged
	);
	const hourList = useSelector((state: any) => state.hours.hourList);
	const temporaryHours = useSelector(
		(state: any) => state.temporaryHours.temporaryHours
	);

	const isTemporaryHourValid = useRecoilValue(isTemporaryHourValidState);

	const [sectionCollapse, setSectionCollapse] = useState(false);

	useEffect(() => {
		dispatch(setTemporaryHours(hourList));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hourList]);

	/**
	 * Range Input을 추가합니다.
	 * @param e
	 */
	const handleAddRangeInput = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!e.currentTarget.id) return;

		const id = e.currentTarget.id.split("-")[0];
		const name = e.currentTarget.id.split("-")[1];

		const targetObjIdx = temporaryHours.findIndex(
			(item: any) => item.id === id
		);
		let newArray = [...temporaryHours];
		const newList = [
			...temporaryHours[targetObjIdx]?.list,
			{ start: "9:00", end: "17:00" },
		];

		newArray[targetObjIdx] = {
			id,
			name,
			list: newList,
		};
		dispatch(setTemporaryHours([...newArray]));
		dispatch(changeHourSaveState());
	};

	/**
	 * Range Input을 삭제합니다.
	 * @param e
	 */
	const handleDeleteRangeInput = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!e.currentTarget.id) return;

		const id = e.currentTarget.id.split("-")[0];
		const name = e.currentTarget.id.split("-")[1];

		const targetObjIdx = temporaryHours.findIndex(
			(item: any) => item.id === id
		);
		const targetIdx = e.currentTarget.tabIndex;

		let newArray = [...temporaryHours];

		const newList = [
			...temporaryHours[targetObjIdx].list.slice(0, targetIdx),
			...temporaryHours[targetObjIdx].list.slice(targetIdx + 1),
		];

		newArray[targetObjIdx] = {
			id,
			name,
			list: newList,
		};

		dispatch(setTemporaryHours([...newArray]));
		dispatch(changeHourSaveState());
	};

	/**
	 * 변경된 시간을 업데이트 합니다.
	 */
	const handleUpdate = () => {
		dispatch(setHours(temporaryHours));
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
			{!sectionCollapse && (
				<>
					{temporaryHours.map((week: any) => {
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
							<Button
								disabled={!isTemporaryHourValid}
								props={!isTemporaryHourValid ? "error" : "main"}
								onClick={handleUpdate}
							>
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

	@media screen and (max-width: 500px) {
		width: 100%;
	}
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

	@media screen and (max-width: 500px) {
		flex-direction: column;
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
			: props.props === "sencond"
			? `color:  ${props.theme.colors.primary}; background-color: white;`
			: `color: white; background-color: lightgray; cursor: unset;`}
`;

const PlusIconBox = styled.div`
	width: 38rem;

	@media screen and (max-width: 500px) {
		width: 100%;
	}
`;

const IconBox = styled.div`
	cursor: pointer;
`;
