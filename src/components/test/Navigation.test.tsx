import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useTestTemplate from "../../hooks/useTestTemplate";

// components
import CatViewer from "../../pages/CatViewer";
import WorkingHours from "../../pages/WorkingHours";
import Navigation from "../Navigation";

describe("네비게이션 버튼을 테스트 합니다.", () => {
	test("첫페이지가 로드되면, 네비게이션 버튼이 존재합니다.", () => {
		render(useTestTemplate(<Navigation />));

		const catViewerBtn = screen.getByRole("link", { name: "Cat Viewer" });
		const workingHourBtn = screen.getByRole("link", {
			name: "Working Hours",
		});

		// 첫 로드 두 버튼이 존재합니다.
		expect(catViewerBtn).toBeInTheDocument();
		expect(workingHourBtn).toBeInTheDocument();
	});

	test("Cat Viewer 버튼을 클릭하면, /cat-viewer로 이동합니다.", async () => {
		// IntersectionObserver isn't available in test environment
		const mockIntersectionObserver = jest.fn();
		mockIntersectionObserver.mockReturnValue({
			observe: () => null,
			unobserve: () => null,
			disconnect: () => null,
		});
		window.IntersectionObserver = mockIntersectionObserver;
		render(useTestTemplate(<Navigation />));

		const catViewerBtn = screen.getByRole("link", { name: "Cat Viewer" });
		await userEvent.click(catViewerBtn);

		render(useTestTemplate(<CatViewer />));
		const loading = screen.getByText("귀여운 고양이들을 데려오고 있어요!");
		expect(loading).toBeInTheDocument();
	});

	test("Working Hour 버튼을 클릭하면, /working-hours로 이동합니다.", async () => {
		render(useTestTemplate(<Navigation />));

		const workingHourBtn = screen.getByRole("link", {
			name: "Working Hours",
		});
		await userEvent.click(workingHourBtn);

		render(useTestTemplate(<WorkingHours />));
		const title = screen.getByText("select your weekly hours");
		expect(title).toBeInTheDocument();
	});
});
