import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
	return (
		<Container>
			<ul>
				<li>
					<Link to="/cat-viewer">CatViewer</Link>
				</li>
				<li>
					<Link to="/working-hour">WorkingHours</Link>
				</li>
			</ul>
		</Container>
	);
};

export default Navigation;

const Container = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
`;
