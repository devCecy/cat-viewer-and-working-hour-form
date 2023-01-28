import styled from "styled-components";
import SelectorInput from "./SelectorInput";

const RangeInput = ({ hourList, info }: any) => {
	return (
		<Container>
			<SelectorInput hour={hourList.start} info={info} position="start" />
			-
			<SelectorInput hour={hourList.end} info={info} position="end" />
		</Container>
	);
};

export default RangeInput;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	column-gap: 1rem;
	height: 100%;
`;
