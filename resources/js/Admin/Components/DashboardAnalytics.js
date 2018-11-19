import React, { Component } from "react";
import classNames from "classnames";
import propTypes from "prop-types";
import styled from "styled-components";
import CardBase from "../Components/Card";

const Card = styled(CardBase)`
	&.has-margin-top {
		margin-top: 15px;
	}
`;

class DashboardAnalytics extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props);
		return (
			<Card
				className={classNames({
					"has-margin-top": this.props.hasMarginTop
				})}
			>
				{this.props.type}
			</Card>
		);
	}
}

export default DashboardAnalytics;
