import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { Component } from "react";
import styled from "styled-components";
import RCSlider, { Handle } from "rc-slider";
import RCTooltip from "rc-tooltip";
import PropTypes from "prop-types";

const handle = props => {
	const { value, dragging, index, ...restProps } = props;
	return (
		<RCTooltip
			prefixCls="rc-slider-tooltip"
			overlay={value}
			visible={dragging}
			placement="top"
			key={index}
		>
			<Handle value={value} {...restProps} />
		</RCTooltip>
	);
};

class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: parseInt(this.props.value.split("px")[0] || 0)
		};
		this.handleChange = this.handleChange.bind(this);
		this.submitChange = this.submitChange.bind(this);
	}
	handleChange(val) {
		this.setState({
			value: val
		});
	}
	submitChange() {
		this.props.onChange(this.state.value);
	}
	render() {
		const { min, max } = this.props;
		const { value } = this.state;
		return (
			<SliderContainer
				min={min}
				max={max}
				value={value}
				handle={handle}
				onChange={this.handleChange}
				onAfterChange={this.submitChange}
			/>
		);
	}
}

Slider.propTypes = {
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

Slider.defaultProps = {
	min: 0,
	max: 100,
	value: "0px"
};

const SliderOuterContainer = styled.div`
	position: relative;
`;

{
	/* <SliderContainer
					type="range"
					min={min}
					max={max}
					value={intValue}
					onChange={onChange}
				/> <Tooltip className="tooltip" style={{ left: intValue + "%" }}>
					{value}
				</Tooltip> */
}

const SliderContainer = styled(RCSlider)`
	.rc-slider-track {
		background-color: ${props => props.theme.mainColor};
	}
	.rc-slider-handle {
		border-color: ${props => props.theme.mainColor};
		&:hover {
			border-color: ${props => props.theme.mainColor};
		}
		&:active {
			border-color: ${props => props.theme.mainColor};
		}
		&:focus {
			border-color: ${props => props.theme.mainColor};
		}
	}
`;

const Tooltip = styled.span`
	position: absolute;
	top: -20px;
	background: ${props => props.theme.darkPrimary};
	color: ${props => props.theme.white};
	font-size: 10px;
	padding: 0.5em;
	border-radius: 10px;
	font-weight: 900;
	transform: translateX(-25%);
	opacity: 0;
	visibility: hidden;
`;

export default Slider;
