import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = styled.div`
	width: 100%;
	margin: 5px 0;
`;

const ListItemHeading = styled.div`
	border-radius: 200px;
	padding: 10px;
	text-transform: uppercase;
	background-color: ${props =>
		props.isOpen ? "rgba(0, 0, 0, 0.25)" : "transparent"};
	transition: ${props => props.theme.easeTransition};
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 12px;
	:hover {
		background: rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}
	h4 {
		font-weight: 900;
	}
	@media screen and (max-width: 1150px) {
		background-color: ${props =>
			props.isOpen ? "rgba(0, 0, 0, 0.1)" : "transparent"};
		color: ${props =>
			props.isOpen ? props.theme.mainColor : props.theme.darkPrimary};
		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
			color: ${props => props.theme.mainColor};
		}
	}
`;

const ListItemGroup = styled.div`
	padding: 0 15px;
	overflow: hidden;
	max-height: 0px;
	&.is-open {
		max-height: 100vh;
	}
	a {
		display: block;
		margin: 10px 0;
		font-weight: 200;
		color: ${props => props.theme.whiteShade1};
		transition: ${props => props.theme.easeTransition};
		font-size: 14px;
		position: relative;
		:hover {
			transform: translate(10px, 0);
		}
		@media screen and (max-width: 1150px) {
			color: ${props => props.theme.darkPrimary};
		}
	}
`;

class SidebarListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.isOpen
		};
	}

	_toggleListItemGroup() {
		this.setState({
			open: !this.state.open
		});
	}

	render() {
		const { heading, children } = this.props;
		const { open } = this.state;
		return (
			<ListItem>
				<ListItemHeading
					onClick={this._toggleListItemGroup.bind(this)}
					isOpen={open}
				>
					<h4>{heading}</h4>
					<FontAwesomeIcon icon={open ? "minus" : "plus"} />
				</ListItemHeading>
				<ListItemGroup isOpen={open} className={open ? "is-open" : ""}>
					{children}
				</ListItemGroup>
			</ListItem>
		);
	}
}

export default SidebarListItem;
