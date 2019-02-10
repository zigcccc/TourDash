import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const Card = props => {
	return (
		<CardContainer
			className={classNames({
				"has-image": props.hasImage
			})}
		>
			<CardImageContainer>
				<img src={props.image} alt="card image" />
			</CardImageContainer>
			{props.children}
		</CardContainer>
	);
};

const CardContainer = styled.div`
	box-shadow: ${props => props.theme.fancyShadow};
	border-radius: 5px;
	background: white;
	padding: 20px;
	&.has-image {
		padding: 0;
	}
`;

const CardImageContainer = styled.div`
	height: 200px;
	overflow: hidden;
	display: flex;
	img {
		object-fit: cover;
		width: 100%;
		height: auto;
	}
`;

export default Card;
