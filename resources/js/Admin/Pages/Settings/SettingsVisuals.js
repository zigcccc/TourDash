import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import _isEmpty from "lodash/isEmpty";
import _omit from "lodash/omit";
import { getSettings, saveSettings } from "../../Store/Actions/SettingsActions";
import { PageWrapper } from "../../Components/Layout";
import { SidebarHeading } from "../../Components/Typography";
import { Columns, Column } from "bloomer";
import Card from "../../Components/Card";
import FontPicker from "font-picker-react";
import ImageInput from "../../Components/Editor/ImageInput";
import { ChromePicker } from "react-color";
import SnackBar from "../../../Shared/Components/Snackbar";

class SettingsVisuals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			primary_logo: {},
			secondary_logo: {},
			favicon: {},
			primary_color: {},
			primary_color_hover: {},
			secondary_color: {},
			secondary_color_hover: {},
			dark_color: {},
			light_color: {},
			heading_font: {},
			text_font: {},
			primary_logo_loading: false,
			secondary_logo_loading: false,
			favicon_loading: false
		};
		this.saveSettings = this.saveSettings.bind(this);
	}

	setFonts(type, font) {
		this.setState({
			...this.state,
			[type]: {
				setting_name: type,
				setting_value: font.family,
				setting_purpose: "visual",
				public: true
			}
		});
	}

	handleImageChange(field, image) {
		this.setState({
			...this.state,
			[`${field}_loading`]: true
		});

		const formData = new FormData();
		formData.append("image", image.target.files[0]);
		axios
			.post("/api/image/add-new", formData)
			.then(res => {
				const { data } = res.data;
				this.setState({
					...this.state,
					[`${field}_loading`]: false,
					[field]: {
						setting_name: field,
						setting_value: field === "favicon" ? data.thumbnail : data.medium,
						setting_purpose: "visual",
						public: true
					}
				});
			})
			.catch(err => console.log(err));
	}

	clearImage(field) {
		this.setState({
			...this.state,
			[field]: {}
		});
	}

	handleColorChange(field, color) {
		this.setState({
			...this.state,
			[field]: {
				setting_name: field,
				setting_value: color.hex,
				setting_purpose: "visual",
				public: true
			}
		});
	}

	saveSettings() {
		const { saveSettings } = this.props;
		saveSettings(
			Object.values(
				_omit(this.state, [
					"primary_logo_loading",
					"secondary_logo_loading",
					"favicon_loading"
				])
			).filter(item => !_isEmpty(item)),
			"visual"
		);
	}

	componentDidMount() {
		const { settings, getSettings } = this.props;
		if (_isEmpty(settings.data.visual)) {
			getSettings("visual").then(res => {
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
				...settings.data.visual
			});
		}
	}

	render() {
		const { settings } = this.props;
		const {
			primary_logo,
			primary_color,
			primary_color_hover,
			secondary_color,
			secondary_logo,
			secondary_color_hover,
			favicon,
			dark_color,
			light_color,
			heading_font,
			text_font,
			primary_logo_loading,
			secondary_logo_loading,
			favicon_loading
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
					<SidebarHeading>Logotip</SidebarHeading>
					<Columns>
						<Column isSize="1/3">
							<Card title="Primarni logotip">
								<ImageInput
									onChange={this.handleImageChange.bind(this, "primary_logo")}
									clearImage={this.clearImage.bind(this, "primary_logo")}
									selectedImagePreview={primary_logo.setting_value || null}
									loading={primary_logo_loading}
								/>
							</Card>
						</Column>
						<Column isSize="1/3">
							<Card title="Sekundardni logotip">
								<ImageInput
									onChange={this.handleImageChange.bind(this, "secondary_logo")}
									clearImage={this.clearImage.bind(this, "secondary_logo")}
									selectedImagePreview={secondary_logo.setting_value || null}
									loading={secondary_logo_loading}
								/>
							</Card>
						</Column>
						<Column isSize="1/3">
							<Card title="Ikona">
								<ImageInput
									onChange={this.handleImageChange.bind(this, "favicon")}
									clearImage={this.clearImage.bind(this, "favicon")}
									selectedImagePreview={favicon.setting_value || null}
									loading={favicon_loading}
								/>
							</Card>
						</Column>
					</Columns>
				</section>
				<section className="section">
					<SidebarHeading>Nastavitve pisave</SidebarHeading>
					<Columns>
						<Column isSize="1/2" isDisplay="flex">
							<Card title="Pisava naslovov">
								<FontPickerCotainer>
									<FontPicker
										apiKey="AIzaSyBvfBlhxYRkc_nc77mMLi_j3njLAvQfKQA"
										options={{ name: "heading" }}
										activeFont={heading_font.setting_value || "Indie Flower"}
										onChange={this.setFonts.bind(this, "heading_font")}
									/>
									<HeadingFont className="apply-font-heading">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Deserunt, porro quae vitae facilis.
									</HeadingFont>
								</FontPickerCotainer>
							</Card>
						</Column>
						<Column isSize="1/2" isDisplay="flex">
							<Card title="Pisava besedila">
								<FontPickerCotainer>
									<FontPicker
										apiKey="AIzaSyBvfBlhxYRkc_nc77mMLi_j3njLAvQfKQA"
										activeFont={text_font.setting_value || "Lato"}
										onChange={this.setFonts.bind(this, "text_font")}
									/>
									<p className="apply-font">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Deserunt, porro quae vitae facilis recusandae voluptas.
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Deserunt, porro quae vitae facilis recusandae voluptas.
									</p>
								</FontPickerCotainer>
							</Card>
						</Column>
					</Columns>
				</section>
				<section className="section">
					<SidebarHeading>Nastavitve barvne palete</SidebarHeading>
					<Columns isMultiline>
						<Column isSize="1/4" isDisplay="flex">
							<Card title="Primarna barva">
								<ColorPickerContainer>
									<ChromePicker
										onChangeComplete={this.handleColorChange.bind(
											this,
											"primary_color"
										)}
										disableAlpha
										color={primary_color.setting_value || "#289781"}
									/>
								</ColorPickerContainer>
							</Card>
						</Column>
						<Column isSize="1/4" isDisplay="flex">
							<Card title="Primarna barva 'hover'">
								<ColorPickerContainer>
									<ChromePicker
										onChangeComplete={this.handleColorChange.bind(
											this,
											"primary_color_hover"
										)}
										disableAlpha
										color={primary_color_hover.setting_value || "#0E876F"}
									/>
								</ColorPickerContainer>
							</Card>
						</Column>
						<Column isSize="1/4" isDisplay="flex">
							<Card title="Sekundarna barva">
								<ColorPickerContainer>
									<ChromePicker
										onChangeComplete={this.handleColorChange.bind(
											this,
											"secondary_color"
										)}
										disableAlpha
										color={secondary_color.setting_value || "#36569F"}
									/>
								</ColorPickerContainer>
							</Card>
						</Column>
						<Column isSize="1/4" isDisplay="flex">
							<Card title="Sekundarna barva 'hover'">
								<ColorPickerContainer>
									<ChromePicker
										onChangeComplete={this.handleColorChange.bind(
											this,
											"secondary_color_hover"
										)}
										disableAlpha
										color={secondary_color_hover.setting_value || "#1C3F8E"}
									/>
								</ColorPickerContainer>
							</Card>
						</Column>
						<Column isSize="1/4" isDisplay="flex">
							<Card title="Primarna temna">
								<ColorPickerContainer>
									<ChromePicker
										onChangeComplete={this.handleColorChange.bind(
											this,
											"dark_color"
										)}
										disableAlpha
										color={dark_color.setting_value || "#373A46"}
									/>
								</ColorPickerContainer>
							</Card>
						</Column>
						<Column isSize="1/4" isDisplay="flex">
							<Card title="Primarna svetla">
								<ColorPickerContainer>
									<ChromePicker
										onChangeComplete={this.handleColorChange.bind(
											this,
											"light_color"
										)}
										disableAlpha
										color={light_color.setting_value || "#FCFCFC"}
									/>
								</ColorPickerContainer>
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

const FontPickerCotainer = styled.div`
	display: flex;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
	#font-picker {
		box-shadow: none !important;
		margin-right: 20px;
		@media screen and (max-width: 768px) {
			width: 100%;
		}
	}
	#font-picker-heading {
		box-shadow: none !important;
		margin-right: 20px;
		@media screen and (max-width: 768px) {
			width: 100%;
		}
	}
	button {
		box-shadow: ${props => props.theme.minimalShadow} !important;
		background-color: ${props => props.theme.white} !important;
		&.dropdown-button {
			border-radius: 5px !important;
			padding: 0.75em 1em;
		}
		@media screen and (max-width: 768px) {
			margin-bottom: 10px;
		}
	}
`;

const HeadingFont = styled.p`
	font-size: 1.4rem;
	font-weight: 900;
`;

const ColorPickerContainer = styled.div`
	.chrome-picker {
		width: 100% !important;
		box-shadow: none !important;
	}
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsVisuals);
