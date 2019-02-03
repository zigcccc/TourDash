import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getSettings } from "../../Store/Actions/SettingsActions";
import _isEmpty from "lodash/isEmpty";
import { PageWrapper } from "../../Components/Layout";
import { Columns, Column } from "bloomer";
import CardBase from "../../Components/Card";

const contactInfoMap = {
	phone_num: "Telefonska številka",
	address: "Naslov",
	email: "E-pošta"
};

const visualInfoMap = {
	primary_color: "Glavna barva",
	secondary_color: "Sekundarna barva",
	dark_color: "Temna barva",
	light_color: "Svetla barva",
	heading_font: "Pisava naslovov",
	text_font: "Pisava besedila"
};

const marketingInfoMap = {
	analytics_tracking_id: "Google Analytics",
	tag_manager_id: "Google Tag Manager",
	facebook_pixel_id: "Faceebok Pixel"
};

class SettingsOverview extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { settings, getSettings } = this.props;
		_isEmpty(settings.data.contact) && getSettings("contact");
		_isEmpty(settings.data.visual) && getSettings("visual");
		_isEmpty(settings.data.marketing) && getSettings("marketing");
	}

	goToSettingPage(page) {
		this.props.history.push(`/settings/${page}`);
	}

	render() {
		const { settings } = this.props;
		return (
			<PageWrapper pageTitle="Pregled nastavitev" loading={settings.loading}>
				<section className="section">
					<Columns isMultiline>
						<Column isSize="1/3" isDisplay="flex">
							<Card
								title="Kontaktne infromacije"
								ctaText="Uredi"
								ctaAction={this.goToSettingPage.bind(this, "contact-info")}
							>
								{Object.keys(settings.data.contact).map(setting => {
									const value = settings.data.contact[setting].setting_value;
									return (
										<InfoRow key={setting}>
											<strong>{contactInfoMap[setting]}</strong>
											<p>{value}</p>
										</InfoRow>
									);
								})}
							</Card>
						</Column>
						<Column isSize="1/3" isDisplay="flex">
							<Card
								title="Vizualne nastavitve"
								ctaText="Uredi"
								ctaAction={this.goToSettingPage.bind(this, "appearance")}
							>
								{Object.keys(settings.data.visual).map(setting => {
									const value = settings.data.visual[setting].setting_value;
									const title = visualInfoMap[setting];
									if (title) {
										return (
											<InfoRow key={setting}>
												<strong>{title}</strong>
												<p>{value}</p>
											</InfoRow>
										);
									} else {
										return null;
									}
								})}
							</Card>
						</Column>
						<Column isSize="1/3" isDisplay="flex">
							<Card
								title="Analitika in marketing"
								ctaText="Uredi"
								ctaAction={this.goToSettingPage.bind(
									this,
									"tracking-and-marketing"
								)}
							>
								{Object.keys(settings.data.marketing).map(setting => {
									const value = settings.data.marketing[setting].setting_value;
									return (
										<InfoRow key={setting}>
											<strong>{marketingInfoMap[setting]}</strong>
											<p>{value}</p>
										</InfoRow>
									);
								})}
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

const mapDispatchToProps = { getSettings };

const InfoRow = styled.div`
	font-size: 14px;
	&::after {
		content: "";
		display: block;
		margin: 15px auto 10px;
		width: 50%;
		background-color: ${props => props.theme.lightGray};
		height: 1px;
	}
	&:last-of-type::after {
		background-color: transparent;
	}
`;

const Card = styled(CardBase)`
	@media screen and (max-width: 768px) {
		margin-bottom: 40px;
	}
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsOverview);
