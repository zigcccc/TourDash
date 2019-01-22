import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setBlockProperty } from "../../Store/Actions/EditingPageActions";
import { Group, GroupItem } from "./SidebarEditor";
import InputField from "./InputField";
import Switch from "../Switch";

class SidebarEditorContactForm extends Component {
	constructor(props) {
		super(props);
		this.setReceiver = this.setReceiver.bind(this);
		this.setSendText = this.setSendText.bind(this);
	}

	toggleField(field, event) {
		const { setBlockProperty, editingBlock } = this.props;
		setBlockProperty("fields", {
			...editingBlock.data.fields,
			[field]: event.target.checked
		});
	}

	setReceiver({ target }) {
		const { setBlockProperty } = this.props;
		setBlockProperty("receiver", target.value);
	}

	setSendText({ target }) {
		const { setBlockProperty } = this.props;
		setBlockProperty("sendText", target.value);
	}

	render() {
		const { editingBlock } = this.props;
		return (
			<Fragment>
				<Group>
					<h3>Izberite polja kontaktnega obrazca</h3>
					<GroupItem>
						<h5>Ime in priimek</h5>
						<Switch
							checked={editingBlock.data.fields.name}
							handleChange={this.toggleField.bind(this, "name")}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Email</h5>
						<Switch
							checked={editingBlock.data.fields.email}
							handleChange={this.toggleField.bind(this, "email")}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Zadeva</h5>
						<Switch
							checked={editingBlock.data.fields.subject}
							handleChange={this.toggleField.bind(this, "subject")}
						/>
					</GroupItem>
					<GroupItem>
						<h5>Sporočilo</h5>
						<Switch
							checked={editingBlock.data.fields.message}
							handleChange={this.toggleField.bind(this, "message")}
						/>
					</GroupItem>
				</Group>
				<Group>
					<h3>Vnesite naslov prejemnika</h3>
					<InputField
						value={editingBlock.data.receiver}
						type="email"
						onChange={this.setReceiver}
					/>
				</Group>
				<Group>
					<h3>Vnesite besedilo gumba za potrditev</h3>
					<InputField
						value={editingBlock.data.sendText}
						type="email"
						onChange={this.setSendText}
					/>
				</Group>
			</Fragment>
		);
	}
}

const GroupItemInline = styled.div`
	display: flex;
`;

const mapStateToProps = state => ({
	editingBlock: state.editingPage.editingBlock
});

const mapDispatchToProps = {
	setBlockProperty
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SidebarEditorContactForm);
