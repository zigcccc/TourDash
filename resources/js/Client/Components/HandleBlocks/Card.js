import React from "react";
import classNames from "classnames";
import { Title } from "bloomer";
import styled from "styled-components";
import darken from "@bit/styled-components.polished.color.darken";
import CardBase from "../../../Admin/Components/Card";

const Card = props => {
	return (
		<StyledCard
			hasBorder={false}
			className={classNames({
				"has-image": props.data.cardImage
			})}
		>
			{props.data.cardImage && (
				<ImageContainer>
					<Image
						src={props.data.cardImage.fullsize}
						alt={props.data.cardTitle}
						isRatio="16:9"
					/>
				</ImageContainer>
			)}
			<CardContent
				className={classNames({
					"has-image": props.data.cardImage
				})}
			>
				<Title tag="h3" isSize={5}>
					{props.data.cardTitle}
				</Title>
				<p>{props.data.cardText}</p>
				{props.data.cardLink.text.length > 0 && (
					<ButtonContainer>
						<Button
							onClick={event => event.preventDefault()}
							href={props.data.cardLink.href}
						>
							{props.data.cardLink.text}
						</Button>
					</ButtonContainer>
				)}
			</CardContent>
		</StyledCard>
	);
};

const CardContent = styled.div`
	&.has-image {
		padding: 1.5em 1em 1em;
	}
`;

const StyledCard = styled(CardBase)`
	&.has-image {
		padding: 0;
		overflow: hidden;
	}
	p {
		line-height: 1.618;
		margin: 5px 0;
	}
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 200px;
`;

const Image = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const Button = styled.a`
	display: inline-block;
	padding: 0.75em 1em;
	font-size: 0.75rem;
	font-weight: bold;
	margin-top: 1em;
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.light};
	border-radius: 5px;
	box-shadow: ${props => props.theme.fancyShadow};
	transition: ${props => props.theme.easeTransition};
	&:hover {
		color: ${props => props.theme.light};
		background-color: ${props =>
			props.theme.mainColor ? darken(0.1, props.theme.mainColor) : "inherit"};
	}
`;

export default Card;
