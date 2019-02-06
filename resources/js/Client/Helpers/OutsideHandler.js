import React, { Component } from "react";
import PropTypes from "prop-types";

class OutiseHandler extends Component {
	constructor(props) {
		super(props);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			this.props.handleClickOutside(event);
		}
	}

	render() {
		return <div ref={this.setWrapperRef}>{this.props.children}</div>;
	}
}

OutiseHandler.propTypes = {
	handleClickOutside: PropTypes.func.isRequired,
	children: PropTypes.element.isRequired
};

export default OutiseHandler;
