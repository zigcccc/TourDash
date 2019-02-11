import React, { Component, Fragment } from "react";
import { ThemeProvider as Theme } from "styled-components";
import { connect } from "react-redux";

class ThemeProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainColor: "#2e8dde",
			mainColorHover: "#4165b9",
			secondaryColor: "#89d2dc",
			secondaryColorHover: "#50bace",
			dark: "#494947",
			light: "#f5f5f5",
			colorSuccess: "#4CAF50",
			colorWarning: "#FFC107",
			colorError: "#F44336",
			colorNotification: "#373A46",
			// Fonts
			headingFont: "Noto Serif",
			textFont: "Lato",
			// transitions
			bounceTransition: "all 450ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
			easeTransition: "all 300ms cubic-bezier(0.785, 0.135, 0.15, 0.86)",
			// shadows
			minimalShadow:
				"0 2px 4px 0 rgba(0,0,0,0.13), 0 3px 6px 0 rgba(0,0,0,0.08)",
			lightShadow: "0 2px 4px 0 rgba(0,0,0,0.23), 0 3px 6px 0 rgba(0,0,0,0.16)",
			hoverShadow:
				"0 4px 8px 0 rgba(0,0,0,0.23), 0 5px 10px 0 rgba(0,0,0,0.16)",
			fancyShadow: "0 0 30px rgba(0,0,0,0.1)",
			fancyHoverShadow: "0 20px 40px rgba(0,0,0,0.15)"
		};
	}

	componentDidMount() {
		const { settings } = this.props;
		if (settings.data.visual) {
			this.setState(
				{
					...this.state,
					mainColor: settings.data.visual.primary_color.setting_value,
					mainColorHover:
						settings.data.visual.primary_color_hover.setting_value,
					secondaryColor: settings.data.visual.secondary_color.setting_value,
					secondaryColorHover:
						settings.data.visual.secondary_color_hover.setting_value,
					dark: settings.data.visual.dark_color.setting_value,
					light: settings.data.visual.light_color.setting_value,
					headingFont: settings.data.visual.heading_font.setting_value,
					textFont: settings.data.visual.text_font.setting_value
				},
				() => {
					if (this.state.light) {
						document.body.style.backgroundColor = this.state.light;
					}
				}
			);
		} else {
			document.body.style.backgroundColor = this.state.light;
		}
	}

	render() {
		const { children } = this.props;
		return (
			<Theme theme={this.state}>
				<Fragment>{children}</Fragment>
			</Theme>
		);
	}
}

const mapStateToProps = state => ({
	settings: state.settings
});

export default connect(
	mapStateToProps,
	null
)(ThemeProvider);
