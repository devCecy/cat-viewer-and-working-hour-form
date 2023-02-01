import styled from "styled-components";

// recoil
import { useRecoilValue } from "recoil";
import { isTemporaryHourValidState } from "../atoms/hours";

// components
import SelectorInput from "./SelectorInput";
import { useSelector } from "react-redux";

interface RangeInputProps {
	hourList: { start: string; end: string };
	info: [string, number, string];
}

const RangeInput = ({ hourList, info }: RangeInputProps) => {
	const isTemporaryHourValid = useRecoilValue(isTemporaryHourValidState);
	const currentInput = useSelector(
		(state: any) => state.currentInputState.currentInput
	);

	return (
		<Container>
			<FlexColumBox>
				<FlexBox>
					<SelectorInput hour={hourList.start} info={info} position="start" />
					-
					<SelectorInput hour={hourList.end} info={info} position="end" />
				</FlexBox>

				{/* 시간 유효성 */}
				{currentInput.targetObj === info[0] &&
					currentInput.targetIdx === info[1] && (
						<span>{!isTemporaryHourValid && "시간을 다시 확인해주세요!"}</span>
					)}
			</FlexColumBox>
		</Container>
	);
};

export default RangeInput;

const Container = styled.div`
	span {
		font-size: 1.5rem;
		color: red;
		text-align: end;
	}
`;

const FlexBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	column-gap: 1rem;
	height: 100%;
`;

const FlexColumBox = styled(FlexBox)`
	flex-direction: column;
	align-items: flex-end;
`;
