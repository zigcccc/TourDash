import React, { Component } from "react";
import styled from "styled-components";
import { Title } from "bloomer";
import PropTypes from "prop-types";

class HandleTypography extends Component {
	render() {
		const { options, data } = this.props;
		switch (options.tag) {
			case "p": {
				return <p style={options.style}>{data}</p>;
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
	options: PropTypes.object,
	data: PropTypes.string.isRequired
};

export default HandleTypography;
