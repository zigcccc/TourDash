import React from "react";
import classNames from "classnames";
import styled from "styled-components";

const Image = props => {
	return (
		<ImageContainer
			className={classNames({
				"image-cover": props.data.doesCover
			})}
			height={props.data.imageHeight}
		>
			<Figure
				className={classNames({
					image: true,
					"is-square": props.data.isRounded,
					"image-cover": props.data.doesCover
				})}
			>
				<StyledImage
					className={classNames({
						"does-cover": props.data.doesCover,
						"is-rounded": props.data.isRounded,
						"has-shadow": props.data.hasShadow
					})}
					src={props.data.imageUrl.fullsize}
					alt={props.data.imageAlt}
				/>
			</Figure>
		</ImageContainer>
	);
};

const ImageContainer = styled.div`
	border-radius: 10px;
	overflown: hidden;
	&.image-cover {
		height: ${props => (props.height ? `${props.height}px` : "auto")};
	}
`;

const Figure = styled.figure`
	margin-left: 0 !important;
	margin-right: 0 !important;
	&.image-cover {
		height: 100%;
		display: flex;
	}
`;

const StyledImage = styled.img`
	max-width: 100%;
	height: auto;
	&.has-shadow {
		box-shadow: ${props => props.theme.fancyShadow};
	}
	&.does-cover {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

export default Image;
