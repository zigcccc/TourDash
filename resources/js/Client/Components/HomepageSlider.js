import React from "react";
import Swipper from "react-id-swiper";
import styled from "styled-components";
import { Container, Title as TitleBase } from "bloomer";
import InvertedCtaBase from "../../Shared/Components/InvertedCta";

const params = {
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
		clickable: true
	},
	loop: true,
	autoplay: {
		delay: 5500,
		disableOnInteraction: true
	}
};

const images = [
	"/images/homepage-slider/image-01.jpeg",
	"/images/homepage-slider/image-02.jpeg",
	"/images/homepage-slider/image-03.jpeg",
	"/images/homepage-slider/image-04.jpeg"
];

const HomepageSlider = props => {
	return (
		<SliderContainer>
			<Swipper {...params}>
				{images.map(image => (
					<Item key={image} image={image} />
				))}
			</Swipper>
			<AbsoluteContent>
				<Title>Vaš sanjski oddih</Title>
				<Cta to="/namestitve/" text="poiščite vašo namestitev" fontSize={20} />
			</AbsoluteContent>
		</SliderContainer>
	);
};

const Item = styled.div`
  min-height: 650px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${props =>
		props.image}');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
`;

const SliderContainer = styled.div`
	position: relative;
	margin-bottom: 100px;
`;

const AbsoluteContent = styled.div`
	position: absolute;
	top: 0;
	height: 650px;
	left: 0;
	right: 0;
	z-index: 8;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Title = styled(TitleBase)`
	font-family: ${props => props.theme.headingFont};
	&.title {
		font-size: 52px;
		color: ${props => props.theme.light};
		margin-bottom: 30px;
	}
	@media screen and (max-width: 768px) {
		&.title {
			text-align: center;
			font-size: 38px;
		}
	}
`;

const Cta = styled(InvertedCtaBase)`
	color: ${props => props.theme.light};
	border-color: ${props => props.theme.light};
	&:hover {
		background-color: ${props => props.theme.light};
		color: ${props => props.theme.dark};
	}
`;

export default HomepageSlider;
