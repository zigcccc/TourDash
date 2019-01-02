import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { produce } from "immer";
import classNames from "classnames";
import { connect } from "react-redux";
import {
	setActiveBlock,
	unsetActiveBlock,
	setPageType,
	setPageUpdateStatus
} from "../../Store/Actions/EditingPageActions";
import _isEqual from "lodash/isEqual";
import _remove from "lodash/remove";
import _findIndex from "lodash/findIndex";
import _move from "lodash-move";
import slugify from "slugify";
import SidebarEditor from "../../Components/Editor/SidebarEditor";
import { Spacer } from "../../Components/Helpers";
import Dropdown from "../../Components/Dropdown";
import HandleBlock from "../../Components/Editor/HandleBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreateNewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			originalState: null
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.autoSlug = this.autoSlug.bind(this);
		this.correctSlug = this.correctSlug.bind(this);
		this.setPageType = this.setPageType.bind(this);
		this.savePage = this.savePage.bind(this);
		this.unsetActiveBlock = this.unsetActiveBlock.bind(this);
		this.setTypographyBlockType = this.setTypographyBlockType.bind(this);
		this.handleFontColor = this.handleFontColor.bind(this);
		this.setMargin = this.setMargin.bind(this);
		this.setTextAlignment = this.setTextAlignment.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	correctSlug() {
		this.setState({
			slug: slugify(this.state.slug),
			slugOverriden: true
		});
	}

	autoSlug() {
		this.setState({
			slug: slugify(this.state.pageTitle, { lower: true })
		});
	}

	setPageType(type) {
		this.props.setPageType(type);
	}

	unsetActiveBlock(e) {
		if (e.target !== e.currentTarget) {
			return;
		}
		this.props.unsetActiveBlock();
	}

	getDiff() {
		const { originalState } = this.state;
		const { pageTitle, slug, type, content } = this.props.editingPage;
		return _isEqual({ pageTitle, slug, type, content }, originalState);
	}

	savePage() {
		this.setState(
			{
				savingPage: true
			},
			() =>
				console.log({
					type: this.state.type,
					title: this.state.pageTitle,
					slug: this.state.slug,
					content: this.state.content
				})
		);
	}

	handleTextDataChange(e) {
		e.persist();
		this.setState(
			produce(draft => {
				draft.content[draft.editingBlock.index].data = e.target.value;
				draft.editingBlock.data = e.target.value;
			})
		);
	}

	handleFontColor(color) {
		this.setState(
			produce(draft => {
				draft.content[draft.editingBlock.index].options.style.color = color.hex;
				draft.editingBlock.options.style.color = color.hex;
			})
		);
	}

	setTypographyBlockType(type) {
		this.setState(
			produce(draft => {
				draft.content[draft.editingBlock.index].options.tag = type;
				draft.editingBlock.options.tag = type;
			})
		);
	}

	setMargin(formattedMargin) {
		this.setState(
			produce(draft => {
				draft.content[
					draft.editingBlock.index
				].options.style.margin = formattedMargin;
				draft.editingBlock.options.style.margin = formattedMargin;
			})
		);
	}

	setTextAlignment(alignment) {
		this.setState(
			produce(draft => {
				draft.content[
					draft.editingBlock.index
				].options.style.textAlign = alignment;
				draft.editingBlock.options.style.textAlign = alignment;
			})
		);
	}

	componentDidMount() {
		const { pageTitle, slug, type, content } = this.props.editingPage;
		this.setState({
			originalState: { pageTitle, slug, type, content }
		});
	}

	componentDidUpdate() {
		const isEqual = this.getDiff();
		if (!isEqual && !this.props.editingPage.hasBeenUpdated) {
			this.props.setPageUpdateStatus(true);
		}
		if (isEqual && this.props.editingPage.hasBeenUpdated) {
			this.props.setPageUpdateStatus(false);
		}
	}

	render() {
		const {
			pageTitle,
			slugOverriden,
			slug,
			type,
			content
		} = this.props.editingPage;
		return (
			<CreatePageContainer>
				<EditorArea onClick={this.unsetActiveBlock}>
					<EditorActionBar>
						<PageTitle
							onChange={this.handleInputChange}
							onBlur={!slugOverriden ? this.autoSlug : null}
							name="pageTitle"
							value={pageTitle}
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
								value={slug}
							/>
						</PageSlugContainer>
						<Spacer />
						<Dropdown
							current={type}
							handleClick={this.setPageType}
							possibilities={[
								"naslovnica",
								"vsebinska",
								"nastanitve",
								"kontakt"
							]}
							icon="chevron-down"
						/>
					</EditorActionBar>
					<EditorContent>
						{content.map((block, i) => (
							<HandleBlock key={block.uid} block={block} blockIndex={i} />
						))}
						<AddNewContent>
							<FontAwesomeIcon icon="plus" />
						</AddNewContent>
					</EditorContent>
				</EditorArea>
				<SidebarArea>
					<SidebarEditor />
				</SidebarArea>
			</CreatePageContainer>
		);
	}
}

const CreatePageContainer = styled.div``;

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

const EditorContent = styled.div``;

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

const AddNewContent = styled.div``;

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

const mapStateToProps = state => ({
	editingPage: state.editingPage
});

const mapDispatchToProps = {
	setActiveBlock,
	unsetActiveBlock,
	setPageType,
	setPageUpdateStatus
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateNewPage);
