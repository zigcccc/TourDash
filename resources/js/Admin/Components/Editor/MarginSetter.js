import React, { Component } from "react";
import classNames from "classnames";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input as BloomerInput } from "bloomer";

class MarginSetter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			unit: "px",
			eq: false
		};
		this.setMargin = this.setMargin.bind(this);
		this.setFormattedMargin = this.setFormattedMargin.bind(this);
		this.toggleEq = this.toggleEq.bind(this);
	}

	setMargin({ target }) {
		if (this.state.eq) {
			this.setState(
				{
					...this.state,
					top: target.value,
					right: target.value,
					bottom: target.value,
					left: target.value
				},
				this.setFormattedMargin
			);
		} else {
			this.setState(
				{
					...this.state,
					[target.name]: target.value
				},
				this.setFormattedMargin
			);
		}
	}

	setFormattedMargin() {
		const { top, right, bottom, left, unit } = this.state;
		const formatedMargin = `${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit}`;
		this.props.onChange(formatedMargin);
	}

	changeUnit(unit) {
		this.setState(
			{
				...this.state,
				unit: unit
			},
			this.setFormattedMargin
		);
	}

	refactorFormatedMargin(formatedMargin, splitSign) {
		const marginArr = formatedMargin
			.split(splitSign)
			.filter(el => el.length != 0);
		return {
			top: marginArr[0],
			right: marginArr[1],
			bottom: marginArr[2],
			left: marginArr[3],
			eq: marginArr.every((val, i, arr) => parseInt(val) === parseInt(arr[0]))
		};
	}

	setInitialValues(formattedMargin) {
		if (formattedMargin) {
			if (formattedMargin.indexOf("%") >= 0) {
				this.setState({
					...this.state,
					...this.refactorFormatedMargin(formattedMargin, "%"),
					unit: "%"
				});
			} else {
				this.setState({
					...this.state,
					...this.refactorFormatedMargin(formattedMargin, "px"),
					unit: "px"
				});
			}
		} else {
			this.setState({
				...this.state,
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				eq: false,
				unit: "px"
			});
		}
	}

	componentDidMount() {
		if (this.props.currentMargin) {
			this.setInitialValues(this.props.currentMargin);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.currentBlock.uid !== this.props.currentBlock.uid) {
			console.log(this.props.currentMargin);
			this.setInitialValues(this.props.currentMargin);
		}
	}

	toggleEq() {
		const { top, bottom, left, right } = this.state;
		const maxValue = Math.max(top, bottom, left, right);
		this.setState(
			{
				...this.state,
				top: maxValue,
				bottom: maxValue,
				left: maxValue,
				right: maxValue,
				eq: !this.state.eq
			},
			this.setFormattedMargin
		);
	}

	render() {
		const { top, bottom, left, right, unit, eq } = this.state;
		return (
			<MarginSetterContainer>
				<MarginInput
					type="text"
					min="0"
					max="100"
					className="left"
					name="left"
					value={left}
					onChange={this.setMargin}
				/>
				<MarginInput
					type="text"
					min="0"
					max="100"
					name="right"
					className="right"
					value={right}
					onChange={this.setMargin}
				/>
				<MarginInput
					type="text"
					min="0"
					max="100"
					name="bottom"
					className="bottom"
					value={bottom}
					onChange={this.setMargin}
				/>
				<MarginInput
					type="text"
					min="0"
					max="100"
					name="top"
					className="top"
					value={top}
					onChange={this.setMargin}
				/>
				<MarginSetterOptions>
					<UnitsContainer>
						<Unit
							onClick={this.changeUnit.bind(this, "px")}
							className={classNames({ active: unit === "px" })}
						>
							px
						</Unit>
						<Unit
							onClick={this.changeUnit.bind(this, "%")}
							className={classNames({ active: unit === "%" })}
						>
							%
						</Unit>
					</UnitsContainer>
					<EqToggle className={classNames({ active: eq })}>
						<FontAwesomeIcon
							onClick={this.toggleEq}
							icon={eq ? "link" : "unlink"}
						/>
					</EqToggle>
				</MarginSetterOptions>
			</MarginSetterContainer>
		);
	}
}

const MarginSetterContainer = styled.div`
	width: 90%;
	margin: 10px auto;
	height: 175px;
	border: 2px dashed ${props => props.theme.darkGray};
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MarginSetterOptions = styled.div``;

const UnitsContainer = styled.div`
	display: flex;
	margin-bottom: 10px;
	padding-bottom: 10px;
	position: relative;
	&::after {
		content: "";
		display: block;
		background: ${props => props.theme.lightGray};
		width: 50px;
		height: 1px;
		position: absolute;
		bottom: 0;
	}
`;

const Unit = styled.span`
	display: flex;
	justify-content: center;
	align-items: center;
	line-height: 1;
	font-size: 16px;
	font-weight: 700;
	margin: 0 5px;
	color: ${props => props.theme.heavyGray};
	transition: ${props => props.theme.easeTransition};
	&:hover {
		cursor: pointer;
		&:not(.active) {
			color: ${props => props.theme.darkPrimary};
		}
	}
	&.active {
		color: ${props => props.theme.mainColor};
	}
`;

const EqToggle = styled.div`
	text-align: center;
	color: ${props => props.theme.heavyGray};
	transition: ${props => props.theme.easeTransition};
	&:hover {
		cursor: pointer;
		&:not(.active) {
			color: ${props => props.theme.darkPrimary};
		}
	}
	&.active {
		color: ${props => props.theme.mainColor};
	}
`;

const MarginInput = styled(BloomerInput)`
	font-size: 12px;
	position: absolute;
	apperance: none;
	text-align: center;
	width: 45px;
	&.top {
		top: 0;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	&.bottom {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%) translateY(50%);
	}
	&.left {
		top: 50%;
		left: 0;
		transform: translateX(-50%) translateY(-50%);
	}
	&.right {
		top: 50%;
		right: 0;
		transform: translateX(50%) translateY(-50%);
	}
`;

export default MarginSetter;
