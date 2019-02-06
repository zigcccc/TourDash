import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Avatar = ({ src, alt, size }) => {
	return (
		<AvatarContainer size={size}>
			<img src={src} alt={alt} />
		</AvatarContainer>
	);
};

Avatar.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired
};

Avatar.defaultProps = {
	size: 50
};

const AvatarContainer = styled.div`
	display: flex;
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	border-radius: 50%;
	overflow: hidden;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

export default Avatar;
