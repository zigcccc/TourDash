import React, { Component, Fragment } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { connect } from "react-redux";
import slugify from "slugify";
import { Spacer } from "../../Components/Helpers";
import PageTypesDropdown from "../../Components/PageTypesDropdown";
import HandleBlock from "../../Components/Editor/HandleBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreateNewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editingBlock: null,
			pageTitle: "Ime strani",
			slug: "ime-strani",
			slugOverriden: false,
			type: "vsebinska",
			savingPage: false,
			content: [
				{
					type: "typography",
					data: "Dobrodošli na uradni strani Hotela Pr'Pristavc",
					options: {
						tag: "h1",
						style: {
							textAlign: "center",
							color: "#2d2d2d",
							size: "22px"
						}
					}
				},
				{
					type: "typography",
					data:
						"Najdite informacije o naših namestitvah, kulinariki in drugih dejavnostih.",
					options: {
						tag: "p",
						style: {
							textAlign: "justify",
							size: "14px"
						}
					}
				}
			]
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.autoSlug = this.autoSlug.bind(this);
		this.correctSlug = this.correctSlug.bind(this);
		this.setPageType = this.setPageType.bind(this);
		this.savePage = this.savePage.bind(this);
		this.unsetActiveBlock = this.unsetActiveBlock.bind(this);
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

	unsetActiveBlock() {
		this.setState({
			editingBlock: null
		});
	}

	moveBlockUp(block, index) {}

	moveBlockDown(block, index) {}

	deleteBlock(index) {}

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

	render() {
		const {
			pageTitle,
			slugOverriden,
			slug,
			type,
			content,
			savingPage,
			editingBlock
		} = this.state;
		return (
			<CreatePageContainer>
				<EditorArea>
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
						<PageTypesDropdown
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
							<Fragment key={i}>
								<HandleBlock
									setActiveBlock={this.setActiveBlock.bind(this, block, i)}
									unsetActiveBlock={this.unsetActiveBlock}
									moveUp={this.moveBlockUp.bind(this, block, i)}
									moveDown={this.moveBlockDown.bind(this, block, i)}
									onDelete={this.deleteBlock.bind(this, i)}
									isFirstItem={i === 0}
									isActive={editingBlock && editingBlock.index === i ? true : false}
									isLastItem={i === content.length - 1}
									type={block.type}
									data={block.data}
									options={block.options}
								/>
							</Fragment>
						))}
					</EditorContent>
				</EditorArea>
				<SidebarArea>
					<SidebarEditor>
						{editingBlock ? (
							<p>{editingBlock.data}</p>
						) : (
							<SidebarEditorNoContentSelected>
								Izberite vsebinski blok in začnete z urejanjem
							</SidebarEditorNoContentSelected>
						)}
					</SidebarEditor>
					<hr />
					<Spacer />
					<SavePage onClick={this.savePage}>
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
