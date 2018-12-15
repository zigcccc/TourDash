import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const EditableAvatar = props => {
	const {
		user,
		imagePreview,
		imageLoading,
		triggerUpload,
		uploadImage,
		triggerRef
	} = props;
	return (
		<EditableAvatarContainer
			className={classNames({
				avatar: true,
				"has-image": user.avatar || imagePreview
			})}
		>
			{imagePreview || user.avatar ? (
				<img src={imagePreview ? imagePreview : user.avatar} alt={user.name} />
			) : (
				<FontAwesomeIcon icon="user" size="6x" />
			)}
			<EditableAvatarOverlay
				className={classNames({
					"avatar-overlay": true,
					"force-visible": imageLoading
				})}
				onClick={triggerUpload}
			>
				<input
					type="file"
					onChange={uploadImage}
					name="avatar-image"
					id="avatar-image-upload"
					ref={triggerRef}
				/>
				{imageLoading ? (
					<FontAwesomeIcon icon="circle-notch" spin size="3x" />
				) : (
					<FontAwesomeIcon icon="pencil-alt" size="3x" />
				)}
			</EditableAvatarOverlay>
		</EditableAvatarContainer>
	);
};

EditableAvatar.propTypes = {
	user: PropTypes.object.isRequired,
	imagePreview: PropTypes.string,
	imageLoading: PropTypes.bool.isRequired,
	triggerUpload: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	triggerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
};

const EditableAvatarContainer = styled.div`
	background-color: ${props => props.theme.lightGray};
	width: 175px;
	height: 175px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	position: relative;
	overflow: hidden;
	transition: ${props => props.theme.easeTransition};
	&.has-image {
		box-shadow: ${props => props.theme.hoverShadow};
	}
	&:hover {
		cursor: pointer;
		.avatar-overlay {
			visibility: visible;
			opacity: 1;
		}
	}
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	svg {
		color: ${props => props.theme.darkGray};
	}
	input {
		display: none;
	}
`;

const EditableAvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom 0;
  border-radius: 50%;
  background-color: rgba(0,0,0,.25);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${props => props.theme.easeTransition};
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  &.force-visible {
    opacity: 1;
    visibility: visible;
  }
  svg {
    color: ${props => props.theme.white};
  }
`;

export default EditableAvatar;
