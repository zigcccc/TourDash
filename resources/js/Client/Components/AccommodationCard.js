import React from "react";
import styled from "styled-components";
import MainCta from "./MainCta";
import slugify from "slugify";
import { Title } from "bloomer";
import { Spacer } from "../Elements";

const AccommodationCard = props => (
	<CardContainer {...props}>
		<ImageContainer>
			<img
				alt={props.accommodation.title}
				src={props.accommodation.featured_image.medium}
			/>
			{(props.accommodation.bestSeller || props.accommodation.trending) && (
				<CardTags>
					{props.accommodation.bestSeller && <span>Najbolje prodajano</span>}
					{props.accommodation.trending && <span>Priljubljeno</span>}
				</CardTags>
			)}
		</ImageContainer>
		<CardContent>
			<TitleContainer>
				<Title tag="h4" isSize={4}>
					{props.accommodation.title}
				</Title>
				<Price>
					{props.accommodation.price}
					<small>€</small>
				</Price>
			</TitleContainer>
			<p>{props.accommodation.description}</p>
			<Spacer />
			<CardButton>
				<MainCta
					to={{
						pathname: `/namestitve/${slugify(props.accommodation.title, {
							lower: true
						})}/`,
						state: { accommodationId: props.accommodation.id }
					}}
					text="Podrobnosti"
					fontSize={14}
				/>
			</CardButton>
		</CardContent>
	</CardContainer>
);

const CardContainer = styled.div`
	background-color: white;
	box-shadow: ${props => props.theme.fancyShadow};
	height: 550px;
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const CardContent = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	flex: 1;
	p {
		font-family: ${props => props.theme.textFont};
	}
`;

const ImageContainer = styled.div`
	display: flex;
	height: 300px;
	overflow: hidden;
	position: relative;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

const CardTags = styled.div`
	display: flex;
	position: absolute;
	top: 20px;
	left: 20px;
	span {
		font-size: 0.8rem;
		padding: 0.75em 1em;
		box-shadow: ${props => props.theme.minimalShadow};
		background-color: ${props => props.theme.light};
		text-transform: uppercase;
		font-weight: 900;
		color: ${props => props.theme.dark};
		font-family: ${props => props.theme.textFont};
		border-radius: 200px;
		&:not(:first-of-type) {
			margin-left: 10px;
		}
	}
`;

const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
`;

const Price = styled.p`
	font-size: 2.5rem;
	color: ${props => props.theme.dark};
	font-family: ${props => props.theme.headingFont};
	font-weight: 900;
	small {
		font-size: 0.75em;
	}
`;

const CardButton = styled.div`
	display: flex;
	justify-content: flex-end;
	a {
		margin: 10px 0;
	}
`;

export default AccommodationCard;
