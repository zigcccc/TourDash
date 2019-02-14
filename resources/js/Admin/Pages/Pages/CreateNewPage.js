import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import classNames from "classnames";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
	setActiveBlock,
	unsetActiveBlock,
	setPageType,
	setPageStatus,
	setPageUpdateStatus,
	clearEditingBlock,
	setPageSetting,
	createNewPage,
	clearErrors,
	setOriginalState,
	populateEditingPage,
	updatePage
} from "../../Store/Actions/EditingPageActions";
import { getPage } from "../../Store/Actions/PagesActions";
import _isEqual from "lodash/isEqual";
import _remove from "lodash/remove";
import _findIndex from "lodash/findIndex";
import _move from "lodash-move";
import slugify from "slugify";
import SidebarEditor from "../../Components/Editor/SidebarEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spacer } from "../../Components/Helpers";
import { Sidebar, MainArea } from "../../Components/Layout";
import Dropdown from "../../Components/Dropdown";
import HandleBlock from "../../Components/Editor/HandleBlock";
import Snackbar from "../../../Shared/Components/Snackbar";

class CreateNewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalState: null,
			pageId: null,
			stateLoading: true,
			actionbarExpanded: false,
			sidebarEditorExpanded: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.autoSlug = this.autoSlug.bind(this);
		this.correctSlug = this.correctSlug.bind(this);
		this.setPageType = this.setPageType.bind(this);
		this.setPageStatus = this.setPageStatus.bind(this);
		this.savePage = this.savePage.bind(this);
		this.unsetActiveBlock = this.unsetActiveBlock.bind(this);
		this.setDefaultState = this.setDefaultState.bind(this);
		this.selectExistingPage = this.selectExistingPage.bind(this);
		this.fetchExistingPage = this.fetchExistingPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
		this.toggleActionBar = this.toggleActionBar.bind(this);
		this.toggleSidebarEditor = this.toggleSidebarEditor.bind(this);
	}

	toggleActionBar() {
		this.setState({
			...this.state,
			actionbarExpanded: !this.state.actionbarExpanded
		});
	}

	toggleSidebarEditor() {
		this.setState(
			{
				...this.state,
				sidebarEditorExpanded: !this.state.sidebarEditorExpanded
			},
			() => {
				if (!this.state.sidebarEditorExpanded) {
					this.props.unsetActiveBlock();
				}
			}
		);
	}

	handleInputChange(e) {
		const { setPageSetting } = this.props;
		setPageSetting(e.target.name, e.target.value);
	}

	correctSlug() {
		const { setPageSetting, editingPage } = this.props;
		setPageSetting("slug", slugify(editingPage.slug, { lower: true }));
		setPageSetting("slugOverriden", true);
	}

	autoSlug() {
		const { setPageSetting, editingPage } = this.props;
		setPageSetting("slug", slugify(editingPage.pageTitle, { lower: true }));
	}

	setPageType(type) {
		const { setPageType } = this.props;
		setPageType(type);
	}

	setPageStatus(status) {
		const { setPageStatus } = this.props;
		setPageStatus(status);
	}

	unsetActiveBlock(e) {
		const { unsetActiveBlock } = this.props;
		if (!e.target.classList.contains("editor")) {
			return;
		}
		unsetActiveBlock();
	}

	getDiff() {
		const { originalState } = this.state;
		const { pageTitle, slug, type, status, content } = this.props.editingPage;
		return _isEqual({ pageTitle, slug, type, status, content }, originalState);
	}

	savePage() {
		const { editingPage, user, createNewPage, history } = this.props;
		if (editingPage.content.length > 0) {
			createNewPage(
				editingPage.pageTitle,
				editingPage.slug,
				editingPage.type,
				"published",
				editingPage.content,
				user.id
			).then(res => {
				if (res.type === "CREATE_PAGE_SUCCESS") {
					history.push("/pages/", {
						success: `Stran "${editingPage.pageTitle}" uspešno objavljena!`
					});
				}
			});
		}
	}

	updatePage() {
		const { editingPage, user, updatePage, match } = this.props;
		if (editingPage.content.length > 0) {
			const data = {
				title: editingPage.pageTitle,
				slug: editingPage.slug,
				type: editingPage.type,
				status: editingPage.status,
				content: editingPage.content,
				user_id: user.id
			};
			updatePage(match.params.id, data).then(res => {
				if (res.type === "UPDATE_PAGE_SUCCESS") {
					this.setDefaultState();
				}
			});
		}
	}

	componentDidMount() {
		const { match, pages } = this.props;
		if (match.params.id) {
			const editingPageIndex = _findIndex(pages.pages.data, {
				id: parseInt(match.params.id)
			});
			if (editingPageIndex >= 0) {
				this.selectExistingPage(editingPageIndex);
			} else {
				this.fetchExistingPage();
			}
		} else {
			this.setDefaultState();
		}
	}

	selectExistingPage(pageIndex) {
		const pageToEdit = this.props.pages.pages.data[pageIndex];
		this.setState({
			pageId: pageToEdit.id,
			originalState: {
				pageTitle: pageToEdit.title,
				slug: pageToEdit.slug,
				status: pageToEdit.status,
				type: pageToEdit.type,
				content: pageToEdit.content
			},
			stateLoading: false
		});
		this.props.populateEditingPage(
			pageToEdit.title,
			pageToEdit.slug,
			pageToEdit.type,
			pageToEdit.status,
			pageToEdit.content
		);
	}

	fetchExistingPage() {
		this.props
			.getPage(this.props.match.params.id)
			.then(res => {
				const { data } = res.payload.data;
				this.setState({
					pageId: data.id,
					originalState: {
						pageTitle: data.title,
						slug: data.slug,
						type: data.type,
						status: data.status,
						content: data.content
					},
					stateLoading: false
				});
				this.props.populateEditingPage(
					data.title,
					data.slug,
					data.type,
					data.status,
					data.content
				);
			})
			.catch(err => console.log(err));
	}

	setDefaultState() {
		const { pageTitle, slug, type, status, content } = this.props.editingPage;
		this.setState({
			originalState: { pageTitle, slug, type, status, content },
			stateLoading: false
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id && !this.props.match.params.id) {
			// Changed from editing page to creating a new one
			this.props.setOriginalState();
			this.setState({
				pageId: null,
				originalState: {
					pageTitle: "Ime strani",
					slug: "ime-strani",
					status: null,
					type: "vsebinska",
					content: []
				}
			});
		}
		if (!prevProps.match.params.id && this.props.match.params.id) {
			// Changed from adding a new page to editing exsiting one
			this.fetchExistingPage();
		}
		const { editingPage, setPageUpdateStatus } = this.props;
		const isEqual = this.getDiff();
		if (!isEqual && !editingPage.hasBeenUpdated) {
			setPageUpdateStatus(true);
		}
		if (isEqual && editingPage.hasBeenUpdated) {
			setPageUpdateStatus(false);
		}
	}

	componentWillUnmount() {
		this.props.setOriginalState();
	}

	render() {
		const {
			editingBlock,
			pageTitle,
			slugOverriden,
			slug,
			type,
			status,
			content,
			hasBeenUpdated,
			savingPage,
			errorMessage,
			successMessage
		} = this.props.editingPage;
		const { actionbarExpanded, sidebarEditorExpanded } = this.state;
		return (
			<Fragment>
				<Snackbar
					isOpen={errorMessage.length > 0}
					hasDissmissAction={true}
					dissmissAction={() => this.props.clearErrors()}
					purpose="error"
					position="bottom"
					message={errorMessage}
				/>
				<Snackbar
					isOpen={successMessage.length > 0}
					purpose="success"
					position="bottom"
					message={successMessage}
				/>
				<div>
					<MainArea onClick={this.unsetActiveBlock}>
						<EditorActionBar
							className={classNames({
								open: actionbarExpanded
							})}
						>
							<ExpandActionBar onClick={this.toggleActionBar}>
								<FontAwesomeIcon
									icon={actionbarExpanded ? "chevron-up" : "chevron-down"}
									size="1x"
								/>
							</ExpandActionBar>
							<PageTitle
								onChange={this.handleInputChange}
								onBlur={!slugOverriden ? this.autoSlug : null}
								name="pageTitle"
								value={this.state.stateLoading ? "" : pageTitle}
							/>
							<PageSlugContainer
								className={classNames({
									open: actionbarExpanded
								})}
							>
								<span>https://localhost:8000/</span>
								<PageSlug
									className={classNames({
										empty: slug.length === 0
									})}
									onChange={this.handleInputChange}
									onBlur={this.correctSlug}
									name="slug"
									value={this.state.stateLoading ? "" : slug}
								/>
							</PageSlugContainer>
							<Spacer />
							<PageTypeDropdown
								className={classNames({ open: actionbarExpanded })}
								current={type}
								handleClick={this.setPageType}
								possibilities={["naslovnica", "vsebinska"]}
								icon="chevron-down"
								loading={this.state.stateLoading}
							/>
							{this.state.pageId && (
								<StatusDropdown
									current={status}
									className={classNames({ open: actionbarExpanded })}
									handleClick={this.setPageStatus}
									possibilities={{ published: "objavljeno", hidden: "skrito" }}
									icon="chevron-down"
									loading={this.state.stateLoading}
									color={status === "published" ? "success" : "danger"}
								/>
							)}
						</EditorActionBar>
						<EditorContainer
							className={classNames({
								editor: true,
								empty: this.state.stateLoading || content.length === 0
							})}
						>
							{this.state.stateLoading ? (
								<IconContainer>
									<LoadingIcon icon="circle-notch" spin size="4x" />
								</IconContainer>
							) : content.length !== 0 ? (
								content.map((block, i) => (
									<HandleBlock key={block.uid} block={block} blockIndex={i} />
								))
							) : (
								<IconContainer>
									<img src="/images/start.svg" alt="Ustvari novo stran" />
									<h4>Začnite dodajati elemente iz desnega menija</h4>
									<p>
										<strong>Ustvarite nekaj čudovitega</strong>
									</p>
								</IconContainer>
							)}
						</EditorContainer>
					</MainArea>
					<Sidebar
						editorExpanded={sidebarEditorExpanded}
						toggleEditor={this.toggleSidebarEditor}
					>
						<SidebarEditor
							editingBlock={editingBlock}
							pageUpdated={hasBeenUpdated}
							savingPage={savingPage}
							ctaText={this.state.pageId ? "Posodobi stran" : "Shrani stran"}
							onSavePage={this.state.pageId ? this.updatePage : this.savePage}
							clearEditingBlock={this.props.clearEditingBlock}
						/>
					</Sidebar>
				</div>
			</Fragment>
		);
	}
}

const EditorActionBar = styled.div`
	background-color: ${props => props.theme.white};
	padding: 1em;
	box-shadow: ${props => props.theme.minimalShadow};
	display: flex;
	position: relative;
	align-items: center;
	transition: ${props => props.theme.easeTransition};
	@media screen and (max-width: 768px) {
		flex-direction: column;
		max-height: 85px;
		&.open {
			max-height: unset;
		}
	}
`;

const ExpandActionBar = styled.div`
	width: 25px;
	height: 25px;
	font-size: 12px;
	color: ${props => props.theme.white};
	background-color: ${props => props.theme.darkPrimary};
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 50%);
	border-radius: 50%;
	justify-content: center;
	align-items: center;
	display: none;
	@media screen and (max-width: 768px) {
		display: flex;
	}
`;

const rocketAnimation = keyframes`
	0% {
		transform: translate(0, 0) rotate(0);
	}
	45% {
		transform: translate(20px, -150px) rotate(35deg);
	}
	55% {
		transform: translate(20px, -150px) rotate(35deg);
	}
	100% {
		transform: translate(0, 0) rotate(0);
	}
`;

const EditorContainer = styled.div`
	min-height: calc(100vh - 150px);
	&.empty {
		display: flex;
		justify-content: center;
		align-items: center;

		img {
			width: 125px;
			transform: rotate(15deg);
			animation: 5s ${rocketAnimation} ease-in-out infinite;
		}

		h4 {
			font-size: 1.35rem;
			text-align: center;
		}
		p {
			text-align: center;
		}
	}
	@media screen and (max-width: 768px) {
		margin-bottom: 125px;
	}
`;

const PageTitle = styled.input`
	font-size: 22px;
	border: none;
	outline: none;
	display: block;
	background: ${props => props.theme.whiteShade2};
	border-radius: 200px;
	padding: 0.5em 0.75em;
	border: 2px solid transparent;
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: none;
		border: 2px solid ${props => props.theme.mainColor};
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		margin-bottom: 15px;
	}
`;

const PageSlugContainer = styled.div`
	margin-left: 15px;
	span {
		color: ${props => props.theme.darkGray};
	}
	@media screen and (max-width: 768px) {
		margin-bottom: 15px;
		opacity: 0;
		visibility: hidden;
		&.open {
			opacity: 1;
			visibility: visible;
		}
	}
`;

const PageSlug = styled.input`
	border: none;
	outline: none;
	font-size: 16px;
	border-bottom: 1px solid transparent;
	&.empty {
		border-color: ${props => props.theme.darkGray};
	}
	&:hover {
		cursor: pointer;
	}
	&:focus {
		outline: none;
		border-color: ${props => props.theme.mainColor};
	}
`;

const PageTypeDropdown = styled(Dropdown)`
	@media screen and (max-width: 768px) {
		visibility: hidden;
		opacity: 0;
		&.open {
			opacity: 1;
			visibility: visible;
		}
	}
`;

const StatusDropdown = styled(Dropdown)`
	margin-left: 10px;
	@media screen and (max-width: 768px) {
		visibility: hidden;
		opacity: 0;
		&.open {
			opacity: 1;
			visibility: visible;
			margin-left: 0px;
			margin-top: 10px;
		}
	}
`;

const IconContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const LoadingIcon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.mainColor};
`;

const mapStateToProps = state => ({
	editingPage: state.editingPage,
	user: state.user.user,
	pages: state.pages
});

const mapDispatchToProps = {
	setActiveBlock,
	unsetActiveBlock,
	setPageType,
	setPageStatus,
	setPageUpdateStatus,
	clearEditingBlock,
	setPageSetting,
	createNewPage,
	clearErrors,
	setOriginalState,
	getPage,
	populateEditingPage,
	updatePage
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(CreateNewPage)
);
