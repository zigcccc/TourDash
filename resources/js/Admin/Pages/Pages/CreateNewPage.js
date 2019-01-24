import React, { Component, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import classNames from "classnames";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
	setActiveBlock,
	unsetActiveBlock,
	setPageType,
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
import Dropdown from "../../Components/Dropdown";
import HandleBlock from "../../Components/Editor/HandleBlock";
import Snackbar from "../../../Shared/Components/Snackbar";

class CreateNewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalState: null,
			pageId: null,
			stateLoading: true
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.autoSlug = this.autoSlug.bind(this);
		this.correctSlug = this.correctSlug.bind(this);
		this.setPageType = this.setPageType.bind(this);
		this.savePage = this.savePage.bind(this);
		this.unsetActiveBlock = this.unsetActiveBlock.bind(this);
		this.setDefaultState = this.setDefaultState.bind(this);
		this.selectExistingPage = this.selectExistingPage.bind(this);
		this.fetchExistingPage = this.fetchExistingPage.bind(this);
		this.updatePage = this.updatePage.bind(this);
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

	unsetActiveBlock(e) {
		const { unsetActiveBlock } = this.props;
		if (e.target !== e.currentTarget) {
			return;
		}
		unsetActiveBlock();
	}

	getDiff() {
		const { originalState } = this.state;
		const { pageTitle, slug, type, content } = this.props.editingPage;
		return _isEqual({ pageTitle, slug, type, content }, originalState);
	}

	savePage() {
		const { editingPage, user, createNewPage, history } = this.props;
		if (editingPage.content.length > 0) {
			createNewPage(
				editingPage.pageTitle,
				editingPage.slug,
				editingPage.type,
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
				type: pageToEdit.type,
				content: pageToEdit.content
			},
			stateLoading: false
		});
		this.props.populateEditingPage(
			pageToEdit.title,
			pageToEdit.slug,
			pageToEdit.type,
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
						content: data.content
					},
					stateLoading: false
				});
				this.props.populateEditingPage(
					data.title,
					data.slug,
					data.type,
					data.content
				);
			})
			.catch(err => console.log(err));
	}

	setDefaultState() {
		const { pageTitle, slug, type, content } = this.props.editingPage;
		this.setState({
			originalState: { pageTitle, slug, type, content },
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
			content,
			hasBeenUpdated,
			savingPage,
			errorMessage,
			successMessage
		} = this.props.editingPage;
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
					<EditorArea onClick={this.unsetActiveBlock}>
						<EditorActionBar>
							<PageTitle
								onChange={this.handleInputChange}
								onBlur={!slugOverriden ? this.autoSlug : null}
								name="pageTitle"
								value={this.state.stateLoading ? "" : pageTitle}
							/>
							<PageSlugContainer>
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
							<Dropdown
								current={type}
								handleClick={this.setPageType}
								possibilities={["naslovnica", "vsebinska"]}
								icon="chevron-down"
								loading={this.state.stateLoading}
							/>
						</EditorActionBar>
						<EditorContainer
							className={classNames({
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
					</EditorArea>
					<SidebarArea>
						<SidebarEditor
							editingBlock={editingBlock}
							pageUpdated={hasBeenUpdated}
							savingPage={savingPage}
							ctaText={this.state.pageId ? "Posodobi stran" : "Shrani stran"}
							onSavePage={this.state.pageId ? this.updatePage : this.savePage}
							clearEditingBlock={this.props.clearEditingBlock}
						/>
					</SidebarArea>
				</div>
			</Fragment>
		);
	}
}

const EditorArea = styled.div`
	padding-right: 300px;
	width: 100%;
	min-height: calc(100vh - 75px);
`;

const EditorActionBar = styled.div`
	background-color: ${props => props.theme.white};
	padding: 1em;
	box-shadow: ${props => props.theme.minimalShadow};
	display: flex;
	align-items: center;
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
`;

const PageSlugContainer = styled.div`
	margin-left: 15px;
	span {
		color: ${props => props.theme.darkGray};
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

const SidebarArea = styled.div`
	width: 300px;
	position: fixed;
	top: 75px;
	bottom: 0;
	right: 0;
	border-left: 1px solid ${props => props.theme.whiteShade3};
	background: ${props => props.theme.whiteShade2};
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	padding-bottom: 75px;
	&::-webkit-scrollbar {
		width: 0px;
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
