import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
	return (
		<Container>
			<ul>
				<li>
					<Link to="/cat-viewer">Cat Viewer</Link>
				</li>
				<li>
					<Link to="/working-hour">Working Hours</Link>
				</li>
			</ul>
		</Container>
	);
};

export default Navigation;

const Container = styled.nav`
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 999;

	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem 0;
	width: 100vw;

	ul {
		display: flex;
		justify-content: space-between;
		column-gap: 1rem;

		li {
			padding: 1rem;
			font-size: 1.5rem;
			border-radius: 0.5rem;
			color: white;
			background-color: ${({ theme }) => theme.colors.primary};
		}
	}
`;
