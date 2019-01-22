import React, { Component } from "react";
import styled from "styled-components";
import classNames from "classnames";
import _debounce from "lodash/debounce";
import _empty from "lodash/isEmpty";
import CardBase from "../Card";
import ContentEditable from "react-sane-contenteditable";
import darken from "@bit/styled-components.polished.color.darken";

class HandleCard extends Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
	}

	onBlur(target, property) {
		const { setBlockProperty, editingPage } = this.props;
		console.log(target.innerText, property);
		if (!_empty(editingPage.editingBlock)) {
			setBlockProperty(property, target.innerText);
		}
	}

	onChange(event, value, property) {
		const { setBlockProperty, editingPage } = this.props;
		if (!_empty(editingPage.editingBlock)) {
			setBlockProperty(property, value);
		}
	}

	render() {
		const { block } = this.props;
		return (
			<Card
				hasBorder={false}
				className={classNames({
					"has-image": block.data.cardImage
				})}
			>
				{block.data.cardImage && (
					<ImageContainer>
						<Image
							src={block.data.cardImage.fullsize}
							alt={block.data.cardTitle}
							isRatio="16:9"
						/>
					</ImageContainer>
				)}
				<CardContent
					className={classNames({
						"has-image": block.data.cardImage
					})}
				>
					<EditableTitle
						tagName="h3"
						content={block.data.cardTitle}
						multiLine={true}
						className="no-margin"
						onBlur={({ target }) => this.onBlur(target, "cardTitle")}
						onChange={() =>
							_debounce(this.onChange.bind(this, "cardTitle"), 250, {
								trailing: true,
								leading: true
							})
						}
					/>
					<EditableText
						tagName="p"
						content={block.data.cardText}
						multiLine={true}
						className="no-margin"
						onBlur={({ target }) => this.onBlur(target, "cardText")}
						onChange={() =>
							_debounce(this.onChange.bind(this, "cardTitle"), 250, {
								trailing: true,
								leading: true
							})
						}
					/>
					{block.data.cardLink.text.length > 0 && (
						<ButtonContainer>
							<Button
								onClick={event => event.preventDefault()}
								href={block.data.cardLink.href}
							>
								{block.data.cardLink.text}
							</Button>
						</ButtonContainer>
					)}
				</CardContent>
			</Card>
		);
	}
}

const CardContent = styled.div`
	&.has-image {
		padding: 1.5em 1em 1em;
	}
`;

const Card = styled(CardBase)`
	&.has-image {
		padding: 0;
		overflow: hidden;
	}
	p {
		line-height: 1.618;
		margin: 5px 0;
	}
`;

const Editable = styled(ContentEditable)`
	outline: none;
	&:focus {
		outline: none;
	}
	&:active {
		outline: none;
	}
	&.no-margin {
		margin-bottom: 0;
	}
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 200px;
`;

const Image = styled.img`
	object-fit: cover;
	width: 100%;
	height: 100%;
`;

const EditableTitle = styled(Editable)``;

const EditableText = styled(Editable)``;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const Button = styled.a`
	display: inline-block;
	padding: 0.75em 1em;
	font-size: 0.75rem;
	font-weight: bold;
	margin-top: 1em;
	background-color: ${props => props.theme.mainColor};
	color: ${props => props.theme.white};
	border-radius: 5px;
	box-shadow: ${props => props.theme.fancyShadow};
	transition: ${props => props.theme.easeTransition};
	&:hover {
		color: ${props => props.theme.white};
		background-color: ${props => darken(0.1, props.theme.mainColor)};
	}
`;

export default HandleCard;
