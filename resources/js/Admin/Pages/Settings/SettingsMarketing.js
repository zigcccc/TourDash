import React, { Component } from "react";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";
import {
	getSettings,
	saveSettings,
	clearMessages
} from "../../Store/Actions/SettingsActions";
import { PageWrapper } from "../../Components/Layout";
import { Columns, Column } from "bloomer";
import Card from "../../Components/Card";
import InputField from "../../Components/InputField";
import SnackBar from "../../../Shared/Components/Snackbar";

class SettingsVisuals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			analytics_tracking_id: {},
			tag_manager_id: {},
			facebook_pixel_id: {}
		};
		this.saveSettings = this.saveSettings.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	saveSettings() {
		const { saveSettings } = this.props;
		saveSettings(
			Object.values(this.state).filter(item => !_isEmpty(item)),
			"marketing"
		);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: {
				...this.state[name],
				setting_value: value,
				setting_name: name,
				setting_purpose: "marketing",
				public: true
			}
		});
	}

	componentDidMount() {
		const { settings, getSettings } = this.props;
		if (_isEmpty(settings.data.marketing)) {
			getSettings("marketing").then(res => {
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
				...settings.data.marketing
			});
		}
	}

	render() {
		const { settings } = this.props;
		const {
			analytics_tracking_id,
			tag_manager_id,
			facebook_pixel_id
		} = this.state;
		return (
			<PageWrapper
				pageTitle="Vizualne nastavitve"
				hasActionButton
				actionButtonText="Shrani nastavitve"
				actionButtonLoading={settings.saving}
				loading={settings.loading}
				onClick={this.saveSettings}
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
							<Card title="Google Analytics">
								<InputField
									value={analytics_tracking_id.setting_value || ""}
									onChange={this.handleChange}
									name="analytics_tracking_id"
									placeholder="UA-XXXXXXX-X"
								/>
							</Card>
						</Column>
						<Column isSize="1/4">
							<Card title="Google Tag Manager">
								<InputField
									value={tag_manager_id.setting_value || ""}
									onChange={this.handleChange}
									name="tag_manager_id"
									placeholder="GTM-XXXXX"
								/>
							</Card>
						</Column>
						<Column isSize="1/4">
							<Card title="Facebook Pixel">
								<InputField
									value={facebook_pixel_id.setting_value || ""}
									onChange={this.handleChange}
									name="facebook_pixel_id"
									placeholder="XXXXXXXXXXXXXXX"
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

const mapDispatchToProps = { getSettings, saveSettings, clearMessages };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsVisuals);
