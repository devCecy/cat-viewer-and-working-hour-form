import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Masonry from "react-masonry-css";

// api
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CAT_API_KEY, CAT_API_URL } from "../utils/envirnment";
import { useInView } from "react-intersection-observer";

interface CatImgResult {
	id: string;
	url: string;
}

interface ImgRectProps {
	width: number;
	height: number;
	top: number;
	left: number;
}

const CatViewer = () => {
	const { ref, inView } = useInView();
	const [catImgs, setCatImgs] = useState<CatImgResult[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedImg, setSelectedImg] = useState("");
	const [isImgClicked, setIsImgClicked] = useState(false);

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

	const [imgRect, setImgRect] = useState<ImgRectProps>({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
	});

	/**
	 * 클릭된 이미지를 크게 보여줍니다.
	 */
	const handleImgModal = (e: React.MouseEvent<HTMLDivElement>) => {
		setSelectedImg(e.currentTarget.id);

		const targetElement = document.getElementById(e.currentTarget.id);
		if (!targetElement) return;
		const imgRect = targetElement.getBoundingClientRect();

		setImgRect({
			width: Math.floor(imgRect.width),
			height: Math.floor(imgRect.height),
			top: Math.floor(imgRect.top),
			left: Math.floor(imgRect.left),
		});
		setIsImgClicked(true);
	};

	const breakpointColumnsObj = {
		default: 3,
		1200: 3,
		700: 2,
		500: 1,
	};
	return (
		<>
			<Container>
				<Contents>
					<Masonry
						breakpointCols={breakpointColumnsObj}
						className="list"
						columnClassName="column"
					>
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
					</Masonry>
				</Contents>

				{isImgClicked ? (
					<ImgModal
						props={imgRect}
						onClick={() => setIsImgClicked(false)}
						src={selectedImg}
						id={selectedImg}
						alt=""
					/>
				) : (
					<CloseImgModal
						props={imgRect}
						src={selectedImg}
						id={selectedImg}
						alt=""
					/>
				)}
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
	.list {
		display: flex;
		padding: 20px 10px;
	}

	.column {
		padding: 0 1rem;
	}
`;

const ImgBox = styled.div<{ props: string }>`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 1.6rem 0;

	img {
		width: 100%;
		max-width: 100%;
		height: 100%;
		cursor: pointer;
	}

	/* &:active img {
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
	} */
`;

const scaleUp = (props: ImgRectProps) => keyframes`
  0% {
  top: ${Number(props.top) + Number(props.height) / 2}px;
	left: ${Number(props.left) + Number(props.width) / 2}px;
	width:${props.width}px;
	height: ${props.height}px;
    }
	100%{
	top: 50%;
	left: 50%;
	width: 100vw;
	height: 100vh;
	}
`;

const ImgModal = styled.img<{ props: ImgRectProps }>`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100vw;
	height: 100vh;

	animation: ${(props) => scaleUp(props.props)} 0.3s linear;
`;

const scaleDown = (props: ImgRectProps) => keyframes`
  0% {
	top: 50%;
	left: 50%;
	width:100%;
	height: 100vh;
  }
	100%{
  top: ${Number(props.top) + Number(props.height) / 2}px;
	left: ${Number(props.left) + Number(props.width) / 2}px;
	width: 0;
	height: 0;
	}
`;

const CloseImgModal = styled.img<{ props: ImgRectProps }>`
	position: fixed;
	top: ${(props) => Number(props.props.top) + Number(props.props.height) / 2}px;
	left: ${(props) =>
		Number(props.props.left) + Number(props.props.width) / 2}px;
	width: 0;
	height: 0;
	transform: translate(-50%, -50%);
	animation: ${(props) => scaleDown(props.props)} 0.3s linear;
`;

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 5rem;
	font-size: 2rem;
`;
