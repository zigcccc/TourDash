import React, { Component } from "react";
import styled from "styled-components";
import { Title as BloomerTitle } from "bloomer";
import PropTypes from "prop-types";

class HandleTypography extends Component {
	render() {
		const { options, data } = this.props.block;
		switch (options.tag) {
			case "p": {
				return <p>{data}</p>;
			}
			case "small": {
				return <small>{data}</small>;
			}
			case "quote": {
				return <blockquote>{data}</blockquote>;
			}
			default: {
				return (
					<Title
						style={options.style}
						tag={options.tag}
						isSize={options.tag.substr(-1, 1)}
					>
						{data}
					</Title>
				);
			}
		}
	}
}

HandleTypography.propTypes = {
	options: PropTypes.object
	//data: PropTypes.string.isRequired
};

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
