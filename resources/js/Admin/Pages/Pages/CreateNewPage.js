import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { produce } from "immer";
import classNames from "classnames";
import { connect } from "react-redux";
import _isEqual from "lodash/isEqual";
import _remove from "lodash/remove";
import _findIndex from "lodash/findIndex";
import _move from "lodash-move";
import slugify from "slugify";
import blockTypeMap from "../../Components/Editor/blockTypeMap";
import possibleTypographyElements from "../../Components/Editor/possibleTypographyElements";
import { defaultPickerColors } from "../../../Shared/Theme";
import { Spacer } from "../../Components/Helpers";
import { Field, TextArea } from "bloomer";
import Dropdown from "../../Components/Dropdown";
import TwitterPicker from "react-color/lib/Twitter";
import HandleBlock from "../../Components/Editor/HandleBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import MarginSetter from "../../Components/Editor/MarginSetter";

class CreateNewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editingBlock: null,
			editingBlockIndex: null,
			pageTitle: "Ime strani",
			slug: "ime-strani",
			slugOverriden: false,
			hasBeenUpdated: false,
			type: "vsebinska",
			savingPage: false,
			content: [
				{
					uid: Math.floor(Math.random() * 100000),
					type: "typography",
					data: "Glavni naslov",
					options: {
						tag: "h1",
						style: {
							textAlign: "center",
							color: "#2d2d2d",
							fontSize: "48px"
						}
					}
				},
				{
					uid: Math.floor(Math.random() * 100000),
					type: "typography",
					data: "Vsebinski podnaslov",
					options: {
						tag: "h4",
						style: {
							textAlign: "center"
						}
					}
				},
				{
					uid: Math.floor(Math.random() * 100000),
					type: "typography",
					data:
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					options: {
						tag: "p",
						style: {
							textAlign: "justify"
						}
					}
				}
			],
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
		this.setState({
			type: type
		});
	}

	setActiveBlock(block, index) {
		this.setState({
			editingBlock: { ...block, index: index }
		});
	}

	unsetActiveBlock(e) {
		if (e.target !== e.currentTarget) {
			return;
		}
		this.setState({
			editingBlock: null
		});
	}

	getDiff() {
		const { pageTitle, slug, type, content, originalState } = this.state;
		return _isEqual({ pageTitle, slug, type, content }, originalState);
	}

	moveBlockUp(index, e) {
		e.stopPropagation();
		if (index !== 0) {
			this.setState({
				...this.state,
				content: _move(this.state.content, index, index - 1)
			});
		}
	}

	moveBlockDown(index, e) {
		e.stopPropagation();
		if (index < this.state.content.length - 1) {
			this.setState({
				...this.state,
				content: _move(this.state.content, index, index + 1)
			});
		}
	}

	async deleteBlock(index, e) {
		e.stopPropagation();
		const response = await swal(
			"Ste prepričani, da želite izbrisati blok?",
			"",
			"info",
			{
				button: {
					text: "Izbriši",
					className: "tourdash-btn"
				}
			}
		);
		if (response) {
			this.setState({
				...this.state,
				content: _remove(this.state.content, (elem, i) => {
					return index !== i;
				})
			});
		}
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

	componentDidMount() {
		const { pageTitle, slug, type, content } = this.state;
		this.setState({
			...this.state,
			originalState: { pageTitle, slug, type, content }
		});
	}

	componentDidUpdate() {
		const isEqual = this.getDiff();
		if (!isEqual && !this.state.hasBeenUpdated) {
			this.setState({
				hasBeenUpdated: true
			});
		}
		if (isEqual && this.state.hasBeenUpdated) {
			this.setState({
				hasBeenUpdated: false
			});
		}
	}

	render() {
		const {
			pageTitle,
			slugOverriden,
			slug,
			type,
			content,
			savingPage,
			editingBlock,
			hasBeenUpdated
		} = this.state;
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
							<Fragment key={block.uid}>
								<HandleBlock
									setActiveBlock={this.setActiveBlock.bind(this, block, i)}
									unsetActiveBlock={this.unsetActiveBlock}
									moveUp={this.moveBlockUp.bind(this, i)}
									moveDown={this.moveBlockDown.bind(this, i)}
									onDelete={this.deleteBlock.bind(this, i)}
									isFirstItem={i === 0}
									isActive={
										editingBlock && editingBlock.uid === block.uid
											? true
											: false
									}
									isLastItem={i === content.length - 1}
									type={block.type}
									data={block.data}
									options={block.options}
								/>
							</Fragment>
						))}
						<AddNewContent>
							<FontAwesomeIcon icon="plus" />
						</AddNewContent>
					</EditorContent>
				</EditorArea>
				<SidebarArea>
					<SidebarEditor>
						{editingBlock ? (
							<Fragment>
								<Group>
									<h3>Tip bloka</h3>
									<p>{blockTypeMap[editingBlock.type]}</p>
								</Group>
								<Group>
									<h3>Vsebina</h3>
									<Field>
										<TextArea
											onChange={this.handleTextDataChange.bind(this)}
											value={editingBlock.data}
										/>
									</Field>
								</Group>
								<Group>
									<h3>Dodatne nastavitve</h3>
									<GroupItem>
										<h5>Tip elementa:</h5>
										<Dropdown
											color="dark"
											handleClick={this.setTypographyBlockType}
											possibilities={possibleTypographyElements}
											current={editingBlock.options.tag}
											fullWidth={true}
											condensed={true}
										/>
									</GroupItem>
									<GroupItem>
										<h5>Barva pisave:</h5>
										<TwitterPicker
											width="250"
											triangle="hide"
											color={editingBlock.options.style.color || "#2d2d2d"}
											colors={defaultPickerColors}
											onChangeComplete={this.handleFontColor}
										/>
									</GroupItem>
									<GroupItem>
										<h5>Odmiki elementa:</h5>
										<MarginSetter
											onChange={this.setMargin}
											currentBlock={editingBlock}
											currentMargin={
												editingBlock.options.style
													? editingBlock.options.style.margin
													: null
											}
										/>
									</GroupItem>
								</Group>
							</Fragment>
						) : (
							<Fragment>
								<SidebarEditorNoContentSelected>
									Izberite vsebinski blok in začnite z urejanjem
								</SidebarEditorNoContentSelected>
							</Fragment>
						)}
					</SidebarEditor>
					<hr />
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
`;

const SidebarEditor = styled.div`
	padding: 10px 15px;
`;

const Group = styled.div`
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

const GroupItem = styled.div`
	margin: 10px 0;
	h5 {
		font-size: 12px;
		margin-bottom: 3px;
	}
`;

const TextEditor = styled.textarea`
	width: 100%;
	margin-top: 5px;
	font-size: 14px;
`;

const SidebarEditorNoContentSelected = styled.p`
	text-align: center;
`;

const SavePage = styled.button`
	border: none;
	outline: none;
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateNewPage);
