import React, { Component, Fragment } from "react";
import styled from "styled-components";
import possibleTypographyElements from "./possibleTypographyElements";
import { defaultPickerColors } from "../../../Shared/Theme";
import MarginSetter from "./MarginSetter";
import TextAlignment from "./TextAlignment";
import TwitterPicker from "react-color/lib/Twitter";
import { Field, TextArea } from "bloomer";
import Dropdown from "../Dropdown";
import { Group } from "./SidebarEditor";

class SidebarEditorTypography extends Component {
	render() {
		const { data, options } = this.props.editingBlock;
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>Vsebina</h3>
					<Field>
						<TextArea
							//onChange={this.handleTextDataChange.bind(this)}
							value={data}
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
							current={options.tag}
							fullWidth={true}
							condensed={true}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Poravnava besedila:</h5>
						<TextAlignment
							onClick={this.setTextAlignment}
							current={options.style.textAlign || "left"}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Barva pisave:</h5>
						<TwitterPicker
							width="250"
							triangle="hide"
							color={options.style.color || "#2d2d2d"}
							colors={defaultPickerColors}
							onChangeComplete={this.handleFontColor}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Odmiki elementa:</h5>
						<MarginSetter
							onChange={this.setMargin}
							currentBlock={editingBlock}
							currentMargin={options.style ? options.style.margin : null}
						/>
					</GroupItem>
				</Group>
			</Fragment>
		);
	}
}

const GroupItem = styled.div`
	margin: 10px 0;
	h5 {
		font-size: 12px;
		margin-bottom: 3px;
	}
`;

export default SidebarEditorTypography;
