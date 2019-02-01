import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MainCta from "../../Shared/Components/MainCta";

class UploadImageBtn extends Component {
	constructor(props) {
		super(props);
		this.inputField = React.createRef();
		this.triggerInput = this.triggerInput.bind(this);
	}

	triggerInput() {
		this.inputField.current.click();
	}

	render() {
		const { text, onChange, loading, fontSize } = this.props;
		return (
			<Fragment>
				<MainCta
					handleClick={this.triggerInput}
					text={text}
					fontSize={fontSize}
					isLoading={loading}
				/>
				<input
					ref={this.inputField}
					type="file"
					name="image"
					style={{ display: "none" }}
					onChange={onChange}
				/>
			</Fragment>
		);
	}
}

UploadImageBtn.propTypes = {
	text: PropTypes.string.isRequired,
	fontSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired
};

UploadImageBtn.defaultProps = {
	fontSize: 14,
	loading: false
};

export default UploadImageBtn;
