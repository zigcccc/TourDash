import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./Logo";
import SidebarListItem from "./SidebarListItem";

const SidebarContainer = styled.div`
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.whiteShade1};
  padding: 15px 15px 100px 15px;
  overflow: scroll;
	position: fixed;
	top: 0;
	bottom: 0;
  left: 0;
  right 0;
  max-width: ${props =>
		props.collapsed ? "50px" : `${props.theme.sidebarWidth}px`};
  transition: 200ms ease-in-out max-width;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ListLink = styled(Link)`
  border-radius: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: ${props =>
		props.className === "is-active"
			? props.theme.mainColorHover
			: "transparent"};
  transition: ${props => props.theme.easeTransition};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.whiteShade1}
  font-weight: 900;
  :hover {
    background: ${props => props.theme.mainColorHover};
    cursor: pointer;
    color: ${props => props.theme.whiteShade1}
  }
`;

const SidebarGroup = styled.div`
	padding-top: 20px;
	position: relative;
	width: 100%;
	::after {
		display: ${props => (props.last ? "none" : "block")};
		content: "";
		background: ${props => props.theme.whiteShade1};
		width: 130px;
		height: 1px;
		margin: 20px auto 0;
	}
`;

const SignOut = styled.a`
	background: ${props => props.theme.mainColorHover};
	position: fixed;
	bottom: 0;
	left: 0;
	width: ${props => props.theme.sidebarWidth}px;
	padding: 20px;
	text-align: center;
	font-size: 14px;
	font-weight: 200;
	color: ${props => props.theme.whiteShade1};
	transition: ${props => props.theme.easeTransition};
	svg {
		margin-right: 1em;
		transition: ${props => props.theme.easeTransition};
	}
	:hover {
		background: #1552ad;
		color: ${props => props.theme.whiteShade1};
		svg {
			transform: translate(-3px, 0);
		}
	}
`;

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false
		};
	}

	_toggleCollapseSiderbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		return (
			<SidebarContainer collapsed={this.state.collapsed}>
				<Link to="/" style={{ padding: "0 30px" }}>
					<Logo.Light />
				</Link>
				<SidebarGroup>
					<ListLink
						to="/"
						className={this.props.match.isExact ? "is-active" : ""}
					>
						Dashboard <FontAwesomeIcon icon="th" />
					</ListLink>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarListItem heading="pages" isOpen={false}>
						<Link to="/pages/">All pages</Link>
						<Link to="/pages/add">Add new page</Link>
						<Link to="/pages/menus">Edit site menus</Link>
					</SidebarListItem>
					<SidebarListItem heading="accommodations" isOpen={false}>
						<Link to="/accommodations/">All accommodations</Link>
						<Link to="/accommodations/add">Add new accommodation</Link>
					</SidebarListItem>
					<SidebarListItem heading="posts" isOpen={false}>
						<Link to="/posts/">All posts</Link>
						<Link to="/posts/add">Add new post</Link>
					</SidebarListItem>
				</SidebarGroup>
				<SidebarGroup last>
					<SidebarListItem heading="customization" isOpen={false}>
						<Link to="/pages/">All pages</Link>
						<Link to="/pages/add">Add new page</Link>
						<Link to="/pages/menus">Edit site menus</Link>
					</SidebarListItem>
					<SidebarListItem heading="settings" isOpen={false}>
						<Link to="/accommodations/">All accommodations</Link>
						<Link to="/accommodations/add">Add new accommodation</Link>
					</SidebarListItem>
				</SidebarGroup>
				<SignOut href="/">
					<span>
						<FontAwesomeIcon icon="chevron-left" />
					</span>
					back to tourdash.app
				</SignOut>
			</SidebarContainer>
		);
	}
}

export default withRouter(Sidebar);
