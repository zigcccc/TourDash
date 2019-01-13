import React from "react";
import classNames from "classnames";
import styled from "styled-components";

const HandleImage = ({ block }) => {
	return (
		<ImageContainer
			className={classNames({
				"image-cover": block.data.doesCover
			})}
			height={block.data.imageHeight}
		>
			<Figure
				className={classNames({
					image: true,
					"is-square": block.data.isRounded,
					"image-cover": block.data.doesCover
				})}
			>
				<Image
					className={classNames({
						"does-cover": block.data.doesCover,
						"is-rounded": block.data.isRounded,
						"has-shadow": block.data.hasShadow
					})}
					src={block.data.imageUrl.fullsize}
					alt={block.data.imageAlt}
				/>
			</Figure>
		</ImageContainer>
	);
};

const ImageContainer = styled.div`
	height: ${props => (props.height ? `${props.height}px` : "auto")};
`;

const Figure = styled.figure`
	margin-left: 0 !important;
	margin-right: 0 !important;
	&.image-cover {
		height: 100%;
		display: flex;
	}
`;

const Image = styled.img`
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

export default HandleImage;
