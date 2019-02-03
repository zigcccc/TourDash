import React, { Component } from "react";
import { PageWrapper } from "../../Components/Layout";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import { getSettings, saveSettings } from "../../Store/Actions/SettingsActions";
import Card from "../../Components/Card";
import { Columns, Column } from "bloomer";
import InputField from "../../Components/InputField";
import SnackBar from "../../../Shared/Components/Snackbar";

class SettingsContactInfo extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.saveSettings = this.saveSettings.bind(this);
		this.state = {
			address: {},
			phone_num: {},
			email: {}
		};
	}

	componentDidMount() {
		const { settings, getSettings } = this.props;
		if (_isEmpty(settings.data.contact)) {
			getSettings("contact").then(res => {
				const { data } = res.payload.data;
				this.setState({
					...this.state,
					...data.reduce((result, setting) => {
						let key = Object.keys(setting)[0];
						result[key] = setting[key];
						return result;
					}, {})
				});
			});
		} else {
			this.setState({
				...this.state,
				...settings.data.contact
			});
		}
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: {
				...this.state[name],
				setting_value: value,
				setting_name: name,
				setting_purpose: "contact",
				public: true
			}
		});
	}

	saveSettings() {
		const { saveSettings } = this.props;
		saveSettings(
			Object.values(this.state).filter(item => !_isEmpty(item)),
			"contact"
		);
	}

	render() {
		const { settings } = this.props;
		const { address, phone_num, email } = this.state;
		return (
			<PageWrapper
				hasActionButton
				actionButtonText="Shrani nastavitve"
				onClick={this.saveSettings}
				actionButtonLoading={settings.saving}
				pageTitle="Kontaktne informacije"
				loading={settings.loading}
			>
				<SnackBar
					hasDissmissAction
					dissmissAction={this.props.clearMessages}
					purpose="success"
					position="top"
					style={{ top: "120px" }}
					isOpen={settings.hasSuccess}
					message={settings.successMessage}
				/>
				<SnackBar
					hasDissmissAction
					dissmissAction={this.props.clearMessages}
					purpose="error"
					position="top"
					style={{ top: "120px" }}
					isOpen={settings.hasErrors}
					message={settings.errorMessage}
				/>
				<section className="section">
					<Columns isMultiline>
						<Column isSize="1/4">
							<Card title="Naslov">
								<InputField
									value={address.setting_value || ""}
									onChange={this.handleChange}
									name="address"
									placeholder="Vnesite svoj naslov"
								/>
							</Card>
						</Column>
						<Column isSize="1/4">
							<Card title="Telefonska številka">
								<InputField
									value={phone_num.setting_value || ""}
									onChange={this.handleChange}
									name="phone_num"
									placeholder="Vnesite svojo telefonsko številko"
								/>
							</Card>
						</Column>
						<Column isSize="1/4">
							<Card title="E-mail">
								<InputField
									value={email.setting_value || ""}
									onChange={this.handleChange}
									name="email"
									placeholder="Vnesite svoj e-poštni naslov"
								/>
							</Card>
						</Column>
					</Columns>
				</section>
			</PageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	settings: state.settings
});

const mapDispatchToProps = { getSettings, saveSettings };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsContactInfo);
