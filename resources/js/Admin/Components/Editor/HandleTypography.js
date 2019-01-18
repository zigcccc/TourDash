import React, { Component } from "react";
import styled from "styled-components";
import _empty from "lodash/isEmpty";
import _debounce from "lodash/debounce";
import { Title as BloomerTitle } from "bloomer";
import PropTypes from "prop-types";
import ContentEditable from "react-sane-contenteditable";

class HandleTypography extends Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.debouncedChanged = _debounce(this.onChange.bind(this), 250, {
			trailing: true,
			leading: true
		});
	}

	onBlur({ target }) {
		const { setBlockContent, editingPage } = this.props;
		console.log(_empty(editingPage.editingBlock));
		if (!_empty(editingPage.editingBlock)) {
			setBlockContent(target.innerText);
		}
	}

	onChange(event, value) {
		const { setBlockContent, editingPage } = this.props;
		if (!_empty(editingPage.editingBlock)) {
			setBlockContent(value);
		}
	}

	render() {
		const { options, data } = this.props.block;
		return (
			<Editable
				tagName={options.tag}
				className="no-margin"
				content={data}
				multiLine={true}
				style={options.style}
				onBlur={this.onBlur}
				onChange={this.debouncedChanged}
			/>
		);
	}
}

HandleTypography.propTypes = {
	options: PropTypes.object,
	data: PropTypes.string
};

const Editable = styled(ContentEditable)`
	outline: none;
	&:focus {
		outline: none;
	}
	&:active {
		outline: none;
	}
	&.no-margin {
		margin-bottom: 0;
	}
`;

const Title = styled(BloomerTitle)`
	&:not(:last-child) {
		margin-bottom: 0;
	}
	&:active {
		outline: none;
	}
	&:focus {
		outline: none;
	}
`;

export default HandleTypography;
