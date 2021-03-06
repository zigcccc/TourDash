import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu } from "../Store/Actions/GlobalActions";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../Shared/Components/Logo";
import SidebarListItem from "./SidebarListItem";
import { sidebarConfig } from "../Utils";

const SidebarPlaceholder = () => (
	<SidebarContainer>
		<Link to="/" style={{ padding: "0 30px" }}>
			<Logo.Light />
		</Link>
		<SidebarGroup>
			<ListLinkPlaceholder />
			<ListLinkPlaceholder />
			<ListLinkPlaceholder />
			<ListLinkPlaceholder />
		</SidebarGroup>
		<SidebarGroup last>
			<ListLinkPlaceholder />
			<ListLinkPlaceholder />
			<ListLinkPlaceholder />
			<ListLinkPlaceholder />
		</SidebarGroup>
	</SidebarContainer>
);

export { SidebarPlaceholder };

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
		const { collapsed } = this.state;
		const { match, user, activePath, menuOpen } = this.props;
		return (
			<SidebarContainer
				collapsed={collapsed}
				className={classNames({
					"mobile-open": menuOpen
				})}
			>
				<LogoLink to="/" style={{ padding: "0 30px" }}>
					<Logo.Light />
				</LogoLink>
				<SidebarGroup>
					<ListLink to="/" className={match.isExact ? "is-active" : ""}>
						Nadzorna plošča <FontAwesomeIcon icon="th" />
					</ListLink>
				</SidebarGroup>
				{sidebarConfig.map((group, i) => (
					<SidebarGroup last={i + 1 === sidebarConfig.length} key={i}>
						{group.map(section => (
							<SidebarListItem
								heading={section.groupName}
								key={section.groupName}
								isOpen={activePath.indexOf(section.groupMainUrl) >= 0}
							>
								{section.groupContent.map(item => {
									if (item.permissions.includes(user.role)) {
										return (
											<Link key={item.linkUrl} to={item.linkUrl}>
												{item.linkName}
											</Link>
										);
									} else {
										return null;
									}
								})}
							</SidebarListItem>
						))}
					</SidebarGroup>
				))}
				<Exit href="/" className={classNames({ "mobile-open": menuOpen })}>
					<span>
						<FontAwesomeIcon icon="chevron-left" />
					</span>
					nazaj na tourdash.app
				</Exit>
			</SidebarContainer>
		);
	}
}

Sidebar.propTypes = {
	user: PropTypes.object.isRequired,
	activePath: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	menuOpen: state.global.menuOpen
});

const mapDispatchToProps = { toggleMenu };

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
	transition: ${props => props.theme.easeTransition};
	@media screen and (max-width: 1300px) {
		max-width: 200px;
	}
	@media screen and (max-width: 1150px) {
		width: 275px;
		max-width: 100%;
		left: -275px;
		background-color: ${props => props.theme.whiteShade1};
		z-index: 5;
		box-shadow: ${props => props.theme.hoverShadow};
		margin-top: 50px;
		&.mobile-open {
			left: 0;
		}
	}
`;

const LogoLink = styled(Link)`
	@media screen and (max-width: 1150px) {
		display: none;
	}
`;

const ListLink = styled(Link)`
  border-radius: 200px;
  padding: 10px;
	text-transform: uppercase;
	font-size: 12px;
  background-color: ${props =>
		props.className === "is-active" ? "rgba(0,0,0,.25)" : "transparent"};
  transition: ${props => props.theme.easeTransition};
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.whiteShade1}
  font-weight: 900;
  :hover {
    background: rgba(0,0,0,.25);
    cursor: pointer;
    color: ${props => props.theme.whiteShade1}
	}
	@media screen and (max-width: 1150px) {
		color: ${props =>
			props.className === "is-active"
				? props.theme.mainColor
				: props.theme.darkPrimary}
		background-color: ${props =>
			props.className === "is-active" ? "rgba(0,0,0,.1)" : "transparent"};
	}
`;

const ListLinkPlaceholder = styled.div`
	border-radius: 200px;
	padding: 10px;
	text-transform: uppercase;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: 900;
	margin: 10px 0;
	min-height: 25px;
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
		@media screen and (max-width: 1150px) {
			background: ${props => props.theme.darkPrimary};
		}
	}
`;

const Exit = styled.a`
	background: rgba(0, 0, 0, 0.25);
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
	@media screen and (max-width: 1300px) {
		width: 200px;
		padding: 15px 10px;
	}
	@media screen and (max-width: 1150px) {
		width: 275px;
		max-width: 100%;
		left: -275px;
		background: ${props => props.theme.mainColor};
		color: ${props => props.theme.white};
		transition: ${props => props.theme.easeTransition};
		&.mobile-open {
			left: 0;
		}
	}
`;

const connectedSidebar = connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar);

export default withRouter(connectedSidebar);
