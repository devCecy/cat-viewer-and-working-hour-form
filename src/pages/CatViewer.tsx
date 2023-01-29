import React, { useEffect, useState } from "react";
import styled from "styled-components";

// api
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CAT_API_KEY, CAT_API_URL } from "../utils/envirnment";
import { useInView } from "react-intersection-observer";

interface CatImgResult {
	id: string;
	url: string;
}

const CatViewer = () => {
	const { ref, inView } = useInView();
	const [catImgs, setCatImgs] = useState<CatImgResult[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedImg, setSelectedImg] = useState("");

	const PER_PAGE = 30;
	const fetchGroups = (): Promise<CatImgResult[]> =>
		axios
			.get(
				`${CAT_API_URL}/images/search?limit=${PER_PAGE}&page=${currentPage}&api_key=${CAT_API_KEY}&order=ASC`
			)
			.then((response) => response.data);

	const { refetch } = useQuery(["catImgs"], fetchGroups, {
		onSuccess: (data) => {
			setCatImgs([...catImgs, ...data]);
		},
		refetchOnWindowFocus: false,
		retry: 0,
	});

	useEffect(() => {
		if (inView) return setCurrentPage(currentPage + 1);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	useEffect(() => {
		if (currentPage === 0) return;

		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	/**
	 * 클릭된 이미지를 크게 보여줍니다.
	 */
	const handleImgModal = (e: React.MouseEvent<HTMLDivElement>) => {
		setSelectedImg(e.currentTarget.id);
	};

	return (
		<>
			<Container>
				<Contents>
					{catImgs.map((img) => {
						return (
							<ImgBox
								props={selectedImg}
								key={`${currentPage}-${img.id}`}
								id={img.url}
								onClick={handleImgModal}
							>
								<img src={img.url} id={img.url} alt="" />
							</ImgBox>
						);
					})}
				</Contents>
			</Container>

			{/* 마지막 contents */}
			<Loading ref={ref}>귀여운 고양이들을 데려오고 있어요!</Loading>
		</>
	);
};

export default CatViewer;

const Container = styled.section`
	max-width: 120rem;
	margin: 8rem auto 0;
`;

const Contents = styled.div`
	column-gap: 1.6rem;
	column-count: 3;
	margin: 0 2.4rem;

	@media screen and (max-width: 500px) {
		margin: 0 1.6rem;
		column-count: 1;
	}

	@media screen and (min-width: 500px) and (max-width: 767px) {
		column-count: 2;
	}
`;

const ImgBox = styled.div<{ props: string }>`
	margin-bottom: 15px;

	img {
		width: 100%;
		max-width: 100%;
		height: 100%;
		cursor: pointer;
		transition: transform 0.2s;
	}

	&:active img {
		position: fixed;
		top: 0;
		left: 0;
		object-fit: contain;
		z-index: 999;
		transform: scale(1);
		-webkit-transform: scale(1.1);
		-moz-transform: scale(1.1);
		-ms-transform: scale(1.1);
		-o-transform: scale(1.1);
		transition: transform 0.2s;
	}
`;

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 5rem;
	font-size: 2rem;
`;
