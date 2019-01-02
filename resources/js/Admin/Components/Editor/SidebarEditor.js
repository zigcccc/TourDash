import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import classNames from "classnames";
import PropTypes from "prop-types";
import styled from "styled-components";
import SidebarEditorTypography from "./SidebarEditorTypography";
import blockTypeMap from "./blockTypeMap";
import { Spacer } from "../Helpers";

class SidebarEditor extends Component {
	render() {
		const { editingBlock, hasBeenUpdated, savingPage } = this.props.editingPage;
		return (
			<SiderbarPlaceholder>
				<SidebarEditorContainer>
					{!_isEmpty(editingBlock) ? (
						<Fragment>
							<Group>
								<h3>Tip bloka</h3>
								<p>{blockTypeMap[editingBlock.type]}</p>
							</Group>
							{(() => {
								switch (editingBlock.type) {
									case "typography": {
										return (
											<SidebarEditorTypography editingBlock={editingBlock} />
										);
									}
									default: {
										return null;
									}
								}
							})()}
						</Fragment>
					) : (
						<Fragment>
							<SidebarEditorNoContentSelected>
								Izberite vsebinski blok in začnite z urejanjem
							</SidebarEditorNoContentSelected>
						</Fragment>
					)}
				</SidebarEditorContainer>
				<Spacer />
				<SavePage
					onClick={hasBeenUpdated ? this.savePage : null}
					className={classNames({
						disabled: !hasBeenUpdated
					})}
				>
					{savingPage ? (
						<FontAwesomeIcon icon="circle-notch" spin size="1x" />
					) : (
						"Shrani stran"
					)}
				</SavePage>
			</SiderbarPlaceholder>
		);
	}
}

SidebarEditor.propTypes = {
	editingBlock: PropTypes.object
};

const SiderbarPlaceholder = styled.div`
	position: relative;
`;

const SidebarEditorContainer = styled.div`
	padding: 10px 15px;
`;

export const Group = styled.div`
	margin: 10px 0;
	&:first-child {
		margin-top: 0;
	}
	&:last-child {
		margin-bottom: 0;
		&::after {
			display: none;
		}
	}
	h3 {
		font-weight: 900;
		font-size: 12px;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
	&::after {
		content: "";
		display: block;
		margin: 15px auto;
		width: 50%;
		height: 1px;
		background: ${props => props.theme.lightGray};
	}
`;

const SidebarEditorNoContentSelected = styled.p`
	text-align: center;
`;

const SavePage = styled.button`
	border: none;
	outline: none;
	position: fixed;
	bottom: 0;
	z-index: 10;
	right: 0;
	width: 300px;
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.white};
	text-transform: uppercase;
	font-weight: 900;
	font-size: 14px;
	padding: 1.5em 1em;
	transition: ${props => props.theme.easeTransition};
	&.disabled {
		background-color: ${props => props.theme.whiteShade3};
		color: ${props => props.theme.darkGray};
		&:hover {
			cursor: not-allowed;
			background-color: ${props => props.theme.whiteShade3};
		}
	}
	&:hover {
		cursor: pointer;
		background-color: ${props => props.theme.mainColorHover};
	}
`;

const mapStateToProps = state => ({
	editingPage: state.editingPage
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditor);
