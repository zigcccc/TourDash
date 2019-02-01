import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ImageInput extends Component {
	constructor(props) {
		super(props);
		this.inputField = React.createRef();
		this.triggerInput = this.triggerInput.bind(this);
	}

	triggerInput() {
		this.inputField.current.click();
	}

	render() {
		const {
			onChange,
			selectedImagePreview,
			clearImage,
			loading,
			containerHeight
		} = this.props;
		if (selectedImagePreview) {
			return (
				<ImageContainer height={containerHeight}>
					{loading && (
						<LoadingOverlay>
							<FontAwesomeIcon icon="circle-notch" spin size="1x" />
						</LoadingOverlay>
					)}
					<ClearBtn
						onClick={clearImage}
						className={classNames({
							disable: loading
						})}
					>
						<FontAwesomeIcon icon="times" />
					</ClearBtn>
					<img src={selectedImagePreview} alt="Preview image" />
				</ImageContainer>
			);
		} else {
			return (
				<ImageInputContainer
					height={containerHeight}
					onClick={this.triggerInput}
				>
					<AddIcon icon="plus" />
					<input
						ref={this.inputField}
						type="file"
						name="image"
						style={{ display: "none" }}
						onChange={onChange}
					/>
				</ImageInputContainer>
			);
		}
	}
}

ImageInput.propTypes = {
	onChange: PropTypes.func.isRequired,
	clearImage: PropTypes.func.isRequired,
	selectedImagePreview: PropTypes.string,
	loading: PropTypes.bool.isRequired,
	containerHeight: PropTypes.number.isRequired
};

ImageInput.defaultProps = {
	loading: false,
	containerHeight: 150
};

const ImageContainer = styled.div`
	display: flex;
	height: ${props => props.height + "px"};
	position: relative;
	img {
		object-fit: contain;
		width: 100%;
		height: 100%;
	}
`;

const LoadingOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100;
	color: ${props => props.theme.white};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ClearBtn = styled.div`
	width: 20px;
	height: 20px;
	font-size: 12px;
	background: ${props => props.theme.darkPrimary};
	color: ${props => props.theme.white};
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(50%, -50%);
	opacity: 0;
	visibility: hidden;
	transition: ${props => props.theme.easeTransition};
	${ImageContainer}:hover & {
		opacity: 1;
		visibility: visible;
		&.disable {
			opacity: 0;
			visibility: hidden;
		}
	}
	&:hover {
		cursor: pointer;
	}
`;

const ImageInputContainer = styled.div`
	border: 2px dashed ${props => props.theme.heavyGray};
	height: ${props => props.height + "px"};
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
		border-color: ${props => props.theme.mainColor};
	}
`;

const AddIcon = styled(FontAwesomeIcon)`
	font-size: 28px;
	color: ${props => props.theme.heavyGray};
	${ImageInputContainer}:hover > & {
		color: ${props => props.theme.mainColor};
	}
`;

export default ImageInput;
