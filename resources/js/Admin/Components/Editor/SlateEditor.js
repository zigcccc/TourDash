import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Editor } from "slate-react";
import { Value } from "slate";
import { isKeyHotkey } from "is-hotkey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DEFAULT_NODE = "paragraph";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");

const wrapLink = (editor, href) => {
	editor.wrapInline({
		type: "link",
		data: { href }
	});
	editor.moveToEnd();
};

const unwrapLink = editor => {
	editor.unwrapInline("link");
};

const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: "block",
				type: "paragraph",
				nodes: []
			}
		]
	}
});

export default class SlateEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.data ? JSON.parse(props.data) : initialValue
		};
		this.onChange = this.onChange.bind(this);
		this.onFinishEditing = this.onFinishEditing.bind(this);
		this.hasMark = this.hasMark.bind(this);
		this.hasBlock = this.hasBlock.bind(this);
		this.hasLinks = this.hasLinks.bind(this);
		this.hasAligment = this.hasAligment.bind(this);
		this.ref = this.ref.bind(this);
		this.renderMarkButton = this.renderMarkButton.bind(this);
		this.renderAlignmentButton = this.renderAlignmentButton.bind(this);
		this.onClickMark = this.onClickMark.bind(this);
		this.onClickButtonBlock = this.onClickButtonBlock.bind(this);
		this.onClickLink = this.onClickLink.bind(this);
		this.onClickAlignment = this.onClickAlignment.bind(this);
	}

	ref(editor) {
		this.editor = editor;
	}

	hasMark(type) {
		const { value } = this.state;
		return value.activeMarks.some(mark => mark.type === type);
	}

	hasBlock(type) {
		const { value } = this.state;
		return value.blocks.some(node => node.type === type);
	}

	hasAligment(alignment) {
		const { value } = this.state;
		return value.blocks.some(node => node.alignment === alignment);
	}

	hasLinks() {
		const { value } = this.state;
		return value.inlines.some(inline => inline.type === "link");
	}

	onChange({ value }) {
		this.setState({ value });
	}

	onFinishEditing() {
		console.log(JSON.stringify(this.state.value.document));
	}

	renderMarkButton(type, icon, className) {
		const isActive = this.hasMark(type);
		return (
			<Button
				active={isActive}
				onPointerDown={event => this.onClickMark(event, type)}
				className={className ? className : null}
			>
				<Icon icon={icon} />
			</Button>
		);
	}

	renderLinkbutton(icon) {
		const isActive = this.hasLinks();
		return (
			<Button
				active={isActive}
				onPointerDown={event => this.onClickLink(event)}
			>
				<Icon icon={icon} />
			</Button>
		);
	}

	renderBlockButton(type, icon, className) {
		let isActive = this.hasBlock(type);
		if (["numbered-list", "bulleted-list"].includes(type)) {
			const {
				value: { document, blocks }
			} = this.state;
			if (blocks.size > 0) {
				const parent = document.getParent(blocks.first().key);
				isActive = this.hasBlock("list-item") && parent && parent.type === type;
			}
		}
		return (
			<Button
				active={isActive}
				onPointerDown={event => this.onClickButtonBlock(event, type)}
				className={className ? className : null}
			>
				<Icon icon={icon} />
			</Button>
		);
	}

	renderAlignmentButton(type, icon) {
		const isActive = this.hasAligment(type);
		return (
			<Button
				active={isActive}
				onPointerDown={event => this.onClickAlignment(event, type)}
			>
				<Icon icon={icon} />
			</Button>
		);
	}

	renderNode(props, editor, next) {
		const { attributes, children, node } = props;

		switch (node.type) {
			case "block-quote":
				return <blockquote {...attributes}>{children}</blockquote>;
			case "bulleted-list":
				return <ul {...attributes}>{children}</ul>;
			case "heading-two":
				return <h2 {...attributes}>{children}</h2>;
			case "heading-three":
				return <h4 {...attributes}>{children}</h4>;
			case "list-item":
				return <li {...attributes}>{children}</li>;
			case "numbered-list":
				return <ol {...attributes}>{children}</ol>;
			case "link": {
				const { data } = node;
				const href = data.get("href");
				return (
					<a {...attributes} href={href}>
						{children}
					</a>
				);
			}
			case "align-left": {
				return (
					<p className="has-text-left" {...attributes}>
						{children}
					</p>
				);
			}
			case "align-right": {
				return (
					<p className="has-text-right" {...attributes}>
						{children}
					</p>
				);
			}
			case "align-center": {
				return (
					<p className="has-text-centered" {...attributes}>
						{children}
					</p>
				);
			}
			case "align-justify": {
				return (
					<p className="has-text-justified" {...attributes}>
						{children}
					</p>
				);
			}
			default:
				return next();
		}
	}

	renderMark(props, editor, next) {
		const { children, mark, attributes } = props;

		switch (mark.type) {
			case "bold":
				return <strong {...attributes}>{children}</strong>;
			case "italic":
				return <em {...attributes}>{children}</em>;
			case "underlined":
				return <u {...attributes}>{children}</u>;
			default:
				return next();
		}
	}

	onKeyDown(event, editor, next) {
		let mark;

		if (isBoldHotkey(event)) {
			mark = "bold";
		} else if (isItalicHotkey(event)) {
			mark = "italic";
		} else if (isUnderlinedHotkey(event)) {
			mark = "underlined";
		} else {
			return next();
		}

		event.preventDefault();
		editor.toggleMark(mark);
	}

	onClickMark(event, type) {
		event.preventDefault();
		this.editor.toggleMark(type);
	}

	onClickButtonBlock(event, type) {
		event.preventDefault();

		const { editor } = this;
		const { value } = editor;
		const { document } = value;

		if (type != "bulleted-list" && type != "numbered-list") {
			const isActive = this.hasBlock(type);
			const isList = this.hasBlock("list-item");

			if (isList) {
				editor
					.setBlocks(isActive ? DEFAULT_NODE : type)
					.unwrapBlock("bulleted-list")
					.unwrapBlock("numbered-list");
			} else {
				editor.setBlocks(isActive ? DEFAULT_NODE : type);
			}
		} else {
			const isList = this.hasBlock("list-item");
			const isType = value.blocks.some(block => {
				return !!document.getClosest(block.key, parent => parent.type == type);
			});

			if (isList && isType) {
				editor
					.setBlocks(DEFAULT_NODE)
					.unwrapBlock("bulleted-list")
					.unwrapBlock("numbered-list");
			} else if (isList) {
				editor
					.unwrapBlock(
						type == "bulleted-list" ? "numbered-list" : "bulleted-list"
					)
					.wrapBlock(type);
			} else {
				editor.setBlocks("list-item").wrapBlock(type);
			}
		}
	}

	onClickLink(event) {
		event.preventDefault();

		const { editor } = this;
		const { value } = editor;
		const hasLinks = this.hasLinks();

		if (hasLinks) {
			editor.command(unwrapLink);
		} else if (value.selection.isExpanded) {
			const href = window.prompt("Enter the URL of the link:");

			if (href === null) {
				return;
			}

			editor.command(wrapLink, href);
		} else {
			const href = window.prompt("Enter the URL of the link:");

			if (href === null) {
				return;
			}

			const text = window.prompt("Enter the text for the link:");

			if (text === null) {
				return;
			}

			editor
				.insertText(text)
				.moveFocusBackward(text.length)
				.command(wrapLink, href);
		}
	}

	onClickAlignment(event, align) {
		const { editor } = this;
		editor.setBlocks({
			type: "alignment",
			data: { align }
		});
	}

	render() {
		const { isActive, margin } = this.props;
		return (
			<EditorContainer className="content" style={{ margin: margin }}>
				<Fragment>
					<Toolbar>
						<ToolbarGroup>
							{this.renderBlockButton("align-left", "align-left")}
							{this.renderBlockButton("align-center", "align-center")}
							{this.renderBlockButton("align-right", "align-right")}
							{this.renderBlockButton("align-justify", "align-justify")}
						</ToolbarGroup>
						<ToolbarGroup>
							{this.renderMarkButton("bold", "bold")}
							{this.renderMarkButton("italic", "italic")}
							{this.renderMarkButton("underlined", "underline", "pushed-down")}
						</ToolbarGroup>
						<ToolbarGroup>{this.renderLinkbutton("link")}</ToolbarGroup>
						<ToolbarGroup>
							{this.renderBlockButton("heading-two", "heading")}
							{this.renderBlockButton("heading-three", "heading", "is-smaller")}
							{this.renderBlockButton("block-quote", "quote-right")}
							{this.renderBlockButton("numbered-list", "list-ol")}
							{this.renderBlockButton("bulleted-list", "list-ul")}
						</ToolbarGroup>
					</Toolbar>
					<Editor
						ref={this.ref}
						autoCorrect
						placeholder="Lorem ipsum dolor sit amet"
						spellCheck
						onKeyDown={this.onKeyDown}
						placeholder="Vnesite in oblikujte besedilo..."
						style={{ padding: 20 }}
						value={this.state.value}
						onChange={this.onChange}
						onBlur={this.onFinishEditing}
						renderMark={this.renderMark}
						renderNode={this.renderNode}
						readOnly={!isActive}
					/>
				</Fragment>
			</EditorContainer>
		);
	}
}

SlateEditor.propTypes = {
	isActive: PropTypes.bool.isRequired,
	margin: PropTypes.string
};

SlateEditor.defaultProps = {
	isActive: false
};

const EditorContainer = styled.div`
	padding: 20px;
	background-color: ${props => props.theme.white};
	box-shadow: ${props => props.theme.fancyShadow};
	&:not(:last-child) {
		margin-bottom: 0;
	}
`;

const Button = styled("span")`
	cursor: pointer;
	color: ${props =>
		props.active ? props.theme.mainColor : props.theme.lightGray};
	&.is-smaller {
		svg {
			transform: scale(0.75) translateY(2px);
		}
	}
	&.pushed-down {
		svg {
			transform: translateY(1px);
		}
	}
`;

const Icon = styled(FontAwesomeIcon)`
	font-size: 14px;
	vertical-align: text-bottom;
`;

const Menu = styled("div")`
	& > * {
		display: inline-block;
	}
	& > * + * {
		margin-left: 15px;
	}
`;

const Toolbar = styled(Menu)`
	position: relative;
	padding: 1px 18px 17px;
	margin: 0 -20px;
	border-bottom: 2px solid #eee;
	margin-bottom: 20px;
`;

const ToolbarGroup = styled.div`
	margin: 0 20px;
	position: relative;
	& > * + * {
		margin-left: 15px;
	}
	&:not(:last-of-type) {
		&::after {
			content: "";
			position: absolute;
			right: -20px;
			top: 0;
			bottom: 0;
			width: 1px;
			background-color: ${props => props.theme.darkGray};
		}
	}
`;
