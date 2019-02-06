import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";
import { connect } from "react-redux";
import {
	getMenu,
	reorderMenu,
	updateMenu,
	clearError,
	clearSuccess
} from "../../Store/Actions/PagesActions";
import { PageWrapper } from "../../Components/Layout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Logo from "../../../Shared/Components/Logo";
import MainCta from "../../../Shared/Components/MainCta";
import SnackBar from "../../../Shared/Components/Snackbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const grid = 10;

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

class EditMenu extends Component {
	constructor(props) {
		super(props);
		this.onDragEnd = this.onDragEnd.bind(this);
		this.updateMenu = this.updateMenu.bind(this);
	}
	componentDidMount() {
		this.props.getMenu();
	}
	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			this.props.menu,
			result.source.index,
			result.destination.index
		);

		this.props.reorderMenu(items);
	}

	updateMenu() {
		this.props.updateMenu(this.props.menu);
	}

	componentWillUnmount() {
		const { clearError, clearSuccess } = this.props;
		clearError();
		clearSuccess();
	}

	render() {
		const { loading, menu, menuHasChanged, pagesLoading, pages } = this.props;
		return (
			<PageWrapper pageTitle="Urejanje menijev">
				{pagesLoading || !menu ? (
					<LoadingContainer>
						<FontAwesomeIcon icon="circle-notch" spin size="2x" />
					</LoadingContainer>
				) : (
					<Fragment>
						<SnackBar
							purpose="success"
							position="bottom"
							message={pages.successMessage}
							isOpen={pages.hasSuccess}
							dissmissAction={() => this.props.clearSuccess()}
						/>
						<SnackBar
							purpose="error"
							position="bottom"
							message={pages.errorMessage}
							isOpen={pages.hasErrors}
							dissmissAction={() => this.props.clearError()}
						/>
						<MenuContainer>
							<Logo.Primary width="250" />
							<DragDropContext onDragEnd={this.onDragEnd}>
								<Droppable
									droppableId="droppable"
									direction={
										window.innerWidth > 768 ? "horizontal" : "vertical"
									}
								>
									{(provided, snapshot) => (
										<DroppableInner
											ref={provided.innerRef}
											className={classNames({
												dragging: snapshot.isDraggingOver
											})}
											{...provided.droppableProps}
										>
											{menu.map((item, index) => (
												<Draggable
													key={item.id}
													draggableId={item.slug}
													index={index}
												>
													{(provided, snapshot) => (
														<DraggableInner
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															className={classNames({
																dragging: snapshot.isDragging
															})}
															style={{ ...provided.draggableProps.style }}
														>
															{item.title}
														</DraggableInner>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</DroppableInner>
									)}
								</Droppable>
							</DragDropContext>
						</MenuContainer>
						<MainCta
							text="shrani meni"
							handleClick={this.updateMenu}
							fontSize={18}
							disabled={!menuHasChanged}
							isLoading={loading}
						/>
					</Fragment>
				)}
			</PageWrapper>
		);
	}
}

EditMenu.propTypes = {
	menu: PropTypes.array,
	pagesLoading: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	menuHasChanged: PropTypes.bool.isRequired
};

const LoadingContainer = styled.div`
	padding: 2em;
	display: flex;
	justify-content: center;
	margin-top: 45px;
	color: ${props => props.theme.mainColor};
`;

const MenuContainer = styled.div`
	display: flex;
	margin-top: 45px;
	justify-content: space-between;
	align-items: center;
	img {
		margin-right: 1em;
	}
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const DraggableInner = styled.div`
	userselect: none;
	padding: ${grid * 2}px;
	margin: 0 ${grid}px 0 0;
	background: ${props => props.theme.whiteShade2};
	box-shadow: ${props => props.theme.lightShadow};
	border-radius: 5px;
	color: ${props => props.theme.darkPrimary};
	padding: 1.5rem 2rem;
	&.dragging {
		background: ${props => props.theme.mainColor};
		color: ${props => props.theme.white};
	}
	@media screen and (max-width: 768px) {
		&:not(:last-of-type) {
			margin-bottom: 5px;
		}
	}
`;

const DroppableInner = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: flex-end;
	padding: ${grid}px;
	overflow: auto;
	background: transparent;
	border: 2px dashed ${props => props.theme.lightGray};
	&.dragging {
		background: ${props => props.theme.lightGray};
		border-color: ${props => props.theme.heavyGray};
	}
	@media screen and (max-width: 768px) {
		margin-top: 20px;
		flex-direction: column;
		width: 100%;
		text-align: center;
	}
`;

const mapStateToProps = state => ({
	loading: state.pages.menu.loading,
	menu: state.pages.menu.menuItems,
	menuHasChanged: state.pages.menu.hasChanged,
	pagesLoading: state.pages.loading,
	pages: state.pages
});

const mapDispatchToProps = {
	getMenu,
	reorderMenu,
	updateMenu,
	clearError,
	clearSuccess
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditMenu);
