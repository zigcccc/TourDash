import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	setTypographyBlockTag,
	toggleFluidBlock,
	setBlockStyle,
	setBlockContent
} from "../../Store/Actions/EditingPageActions";
import _throttle from "lodash/throttle";
import MarginSetter from "./MarginSetter";
import { Field, TextArea } from "bloomer";
import { Group, GroupItem } from "./SidebarEditor";
import Switch from "../Switch";

class SidebarEditorCustomHtml extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
		this.toggleFluidBlock = this.toggleFluidBlock.bind(this);
		this.setBlockStyle = this.setBlockStyle.bind(this);
		this.handleTextDataChange = this.handleTextDataChange.bind(this);
		this.submitTextDataChange = this.submitTextDataChange.bind(this);
		this.throttledTextSubmit = _throttle(
			this.submitTextDataChange.bind(this),
			2500
		);
	}

	toggleFluidBlock({ target }) {
		this.props.toggleFluidBlock(!target.checked);
	}

	setBlockStyle(property, value) {
		this.props.setBlockStyle(property, value);
	}

	handleTextDataChange(e) {
		this.setState({
			text: e.target.value
		});
		this.throttledTextSubmit(e.target.value);
	}

	submitTextDataChange() {
		const { setBlockContent } = this.props;
		setBlockContent(this.state.text);
	}

	componentDidMount() {
		this.setState({
			text: this.props.editingBlock.data
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.editingBlock.uid !== this.props.editingBlock.uid) {
			this.setState({
				text: this.props.editingBlock.data
			});
		}
	}

	render() {
		const { options } = this.props.editingBlock;
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>HTML koda</h3>
					<Field>
						<TextArea
							onChange={this.handleTextDataChange}
							onBlur={this.submitTextDataChange}
							value={this.state.text}
						/>
					</Field>
				</Group>
				<Group>
					<h3>Dodatne nastavitve</h3>
					<GroupItem>
						<h5>Odmiki elementa:</h5>
						<MarginSetter
							onChange={this.setBlockStyle}
							currentBlock={editingBlock}
							currentMargin={options ? options.style.margin : null}
						/>
					</GroupItem>
					{!editingBlock.hasParent && (
						<GroupItem>
							<h5>Omejena širina:</h5>
							<Switch
								name="block-fluid"
								checked={!editingBlock.isFluid}
								handleChange={this.toggleFluidBlock}
							/>
						</GroupItem>
					)}
				</Group>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	editingBlock: state.editingPage.editingBlock
});

const mapDispatchToProps = {
	setTypographyBlockTag,
	toggleFluidBlock,
	setBlockStyle,
	setBlockContent
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorCustomHtml);
