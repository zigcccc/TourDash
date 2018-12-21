import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import MainCtaBase from "../../Shared/Components/MainCta";
import { OutsideHandler } from "../Components/Helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditableText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			wasEdited: false
		};
		this.toggleEdit = this.toggleEdit.bind(this);
		this.disableEditing = this.disableEditing.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
		this.inputElement = React.createRef();
	}

	toggleEdit() {
		this.setState(
			{
				editing: !this.state.editing
			},
			() => this.state.editing && this.inputElement.current.focus()
		);
	}

	onInputChange() {
		this.setState({
			wasEdited:
				this.inputElement.current.defaultValue !==
				this.inputElement.current.value
		});
	}

	disableEditing() {
		this.setState({
			editing: false
		});
	}

	handleClick() {
		const { onSubmit, type } = this.props;
		if (type === "password") {
			onSubmit();
		} else {
			onSubmit(this.inputElement.current.name, this.inputElement.current.value);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.isLoading !== this.props.isLoading &&
			this.props.isLoading === false
		) {
			this.setState({ ...this.state, wasEdited: false });
		}
	}

	render() {
		const { value, type, label, name, isLoading } = this.props;
		const { editing, wasEdited } = this.state;
		return (
			<Group>
				<OutsideHandler handleClickOutside={this.disableEditing}>
					<Fragment>
						<GroupLabel className={classNames({ active: editing })}>
							{label}
						</GroupLabel>
						<GroupInner>
							{editing ? (
								<GroupInput
									ref={this.inputElement}
									defaultValue={value}
									onChange={this.onInputChange}
									type={type}
									name={name}
								/>
							) : (
								<GroupData
									onClick={type === "password" ? null : this.toggleEdit}
									className={classNames({
										"no-hover": type === "password"
									})}
								>
									{value}
									{type !== "password" && (
										<EditIcon>
											<FontAwesomeIcon icon="pencil-alt" size="1x" />
										</EditIcon>
									)}
								</GroupData>
							)}
							{((editing && wasEdited) || type === "password") && (
								<MainCta
									text={type === "password" ? "Spremeni geslo" : "shrani"}
									handleClick={this.handleClick}
									fontSize={10}
									isLoading={type === "password" ? false : isLoading}
								/>
							)}
						</GroupInner>
					</Fragment>
				</OutsideHandler>
			</Group>
		);
	}
}

EditableText.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	value: PropTypes.string,
	type: PropTypes.oneOf(["email", "text", "password"]),
	label: PropTypes.string,
	isLoading: PropTypes.bool,
	name: PropTypes.string.isRequired
};

EditableText.defaultProps = {
	type: "text"
};

const Group = styled.div`
	margin: 15px 0;
`;

const GroupInner = styled.div`
	display: flex;
	justify-content: space-between;
`;

const GroupLabel = styled.p`
	text-transform: uppercase;
	font-size 10px;
  font-weight: 900;
  &.active {
    color: ${props => props.theme.mainColor}
  }
`;

const GroupData = styled.p`
	font-size: 18px;
	&:hover {
		cursor: pointer;
	}
	&.no-hover {
		&:hover {
			cursor: default;
		}
	}
`;

const GroupInput = styled.input`
	font-size: 18px;
	border: none;
	outline: none;
	border-bottom: 2px solid ${props => props.theme.mainColor};
`;

const MainCta = styled(MainCtaBase)`
	min-width: 65px;
	margin: 0;
`;

const EditIcon = styled.span`
	color: ${props => props.theme.darkPrimary};
	font-size: 12px;
	margin-left: 1em;
	opacity: 0;
	transition: ${props => props.theme.easeTransition};
	${GroupData}:hover & {
		opacity: 1;
	}
	svg {
		transform: translateY(-2px);
	}
`;

export default EditableText;
