import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Gallery from "react-photo-gallery";
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from "react-sortable-hoc";

const Photo = ({ photo, margin, direction, top, left }) => {
	const imgStyle = {
		margin: margin,
		objectFit: "cover",
		maxHeight: "100%",
		borderRadius: 5,
		boxShadow: "0 10px 20px rgba(0,0,0,.1)"
	};
	if (direction === "column") {
		imgStyle.position = "absolute";
		imgStyle.left = left;
		imgStyle.top = top;
	}

	return <img style={imgStyle} {...photo} alt="img" />;
};

const SortablePhoto = SortableElement(Photo);
const SortableGallery = SortableContainer(({ photos, grid }) => (
	<div style={{ marginTop: 20 }}>
		<Gallery
			photos={photos}
			margin={5}
			columns={grid}
			ImageComponent={SortablePhoto}
		/>
	</div>
));

class SortableImages extends Component {
	constructor(props) {
		super(props);
		this.onSortEnd = this.onSortEnd.bind(this);
	}

	onSortEnd({ oldIndex, newIndex }) {
		const { reorderImages, images } = this.props;
		reorderImages(arrayMove(images, oldIndex, newIndex));
	}

	render() {
		const { images, columns } = this.props;
		return (
			<SortableGallery
				axis="xy"
				grid={columns}
				photos={images}
				onSortEnd={this.onSortEnd}
			/>
		);
	}
}

SortableImages.propTypes = {
	images: PropTypes.array,
	columns: PropTypes.number.isRequired,
	reorderImages: PropTypes.func.isRequired
};

SortableImages.defaultProps = {
	columns: 5
};

export default SortableImages;
