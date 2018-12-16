import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactPlaceholder from "react-placeholder";
import { connect } from "react-redux";
import {
	updateProfileImage,
	updateUser
} from "../../Store/Actions/UserActions";
import { PageWrapper } from "../../Components/Layout";
import { Columns, Column } from "bloomer";
import EditableText from "../../Components/EditableText";
import Card from "../../Components/Card";
import EditableAvatar from "../../Components/EditableAvatar";
import Snackbar from "../../../Shared/Components/Snackbar";
import { validResponse } from "../../../Shared/Utils";

class MyProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImage: null,
			selectedImagePreview: "",
			imageLoading: false,
			successMessage: "",
			errorMessage: "",
			hasErrors: false,
			hasSuccess: false
		};
		this.imageUploadTrigger = React.createRef();
		this.uploadImage = this.uploadImage.bind(this);
		this.triggerUploadImage = this.triggerUploadImage.bind(this);
		this.dissmissNotifications = this.dissmissNotifications.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	triggerUploadImage() {
		this.imageUploadTrigger.current.click();
	}

	async updateUser(field, value) {
		const { updateUser, user } = this.props;
		const data = {
			[field]: value
		};
		try {
			const response = await updateUser(user.id, data);
			if (validResponse(response.payload)) {
				this.setState({
					...this.state,
					hasSuccess: true,
					successMessage: response.payload.data.message.success
				});
			}
		} catch (err) {
			console.log(err.response);
		}
	}

	async uploadImage(e) {
		const { updateProfileImage, user } = this.props;
		this.setState({
			...this.state,
			selectedImage: e.target.files[0],
			imageLoading: true,
			selectedImagePreview: e.target.files[0]
				? URL.createObjectURL(e.target.files[0])
				: ""
		});
		const formData = new FormData();
		formData.append("image", e.target.files[0]);
		try {
			const response = await updateProfileImage(user.id, formData);
			if (validResponse(response.payload)) {
				this.setState({
					...this.state,
					imageLoading: false,
					successMessage: response.payload.data.message.success,
					hasSuccess: true
				});
			} else {
				this.setState({
					...this.state,
					imageLoading: false,
					selectedImage: null,
					selectedImagePreview: "",
					hasErrors: true,
					errorMessage: response.error.response.data
						? response.error.response.data.error.image[0]
						: "Velikost datoteke je prevelika. Največja dovoljena velikost je 2.5MB"
				});
			}
		} catch (err) {
			this.setState({
				...this.state,
				imageLoading: false,
				selectedImage: null,
				selectedImagePreview: "",
				hasErrors: true,
				errorMessage:
					"Napaka pri nalaganju fotografije. Bodite pozorni, da velikost datoteke ne presega 2.5MB"
			});
		}
	}

	dissmissNotifications() {
		this.setState({
			...this.state,
			hasSuccess: false,
			hasErrors: false
		});
	}

	render() {
		const { user, userLoaded, userLoading } = this.props;
		const {
			selectedImagePreview,
			successMessage,
			errorMessage,
			imageLoading,
			hasErrors,
			hasSuccess
		} = this.state;
		return (
			<PageWrapper pageTitle="Moj profil">
				<Snackbar
					isOpen={hasSuccess}
					hasDissmissAction={true}
					dissmissAction={this.dissmissNotifications}
					purpose="success"
					message={successMessage}
				/>
				<Snackbar
					isOpen={hasErrors}
					hasDissmissAction={true}
					dissmissAction={this.dissmissNotifications}
					purpose="error"
					position="bottom"
					message={errorMessage}
				/>
				<ContentContainer>
					<Column>
						<Card title="Moji podatki">
							<Columns>
								<AvatarContainer isSize={{ widescreen: "1/3", default: "1/2" }}>
									<ReactPlaceholder
										ready={userLoaded}
										type="round"
										color="#DBDDE0"
									>
										<EditableAvatar
											user={user}
											imagePreview={selectedImagePreview}
											imageLoading={imageLoading}
											triggerRef={this.imageUploadTrigger}
											uploadImage={this.uploadImage}
											triggerUpload={this.triggerUploadImage}
										/>
									</ReactPlaceholder>
								</AvatarContainer>
								<Column isSize={{ widescreen: "2/3", default: "1/2" }}>
									<EditableText
										onSubmit={this.updateUser}
										value={user.name}
										name="name"
										label="Ime in priimek"
										isLoading={userLoading}
									/>
									<EditableText
										onSubmit={this.updateUser}
										value={user.email}
										label="E-pošta"
										name="email"
										isLoading={userLoading}
									/>
									<Group>
										<GroupLabel>Skrbniške pravice</GroupLabel>
										<GroupData>{user.role}</GroupData>
									</Group>
								</Column>
							</Columns>
						</Card>
					</Column>
					<Column>
						<Card title="Moje aktivnosti">
							<br />
						</Card>
					</Column>
				</ContentContainer>
			</PageWrapper>
		);
	}
}

MyProfile.propTypes = {
	user: PropTypes.object
};

const mapStateToProps = state => {
	return {
		user: state.user.user,
		userLoaded: state.user.ready,
		userLoading: state.user.loading
	};
};

const mapDispatchToProps = {
	updateProfileImage,
	updateUser
};

const ContentContainer = styled(Columns)`
	margin-top: 30px;
`;

const AvatarPlaceholder = styled(ReactPlaceholder)`
	width: 175px;
	height: 175px;
	@media (max-width: 1550px) and (min-width: 1250px) {
		width: 140px;
		height: 140px;
	}
`;

const AvatarContainer = styled(Column)`
	margin-top: 10px;
	justify-content: center;
	display: flex;
`;

const Group = styled.div`
	margin: 15px 0;
`;

const GroupLabel = styled.p`
	text-transform: uppercase;
	font-size 10px;
	font-weight: 900;
`;

const GroupData = styled.p`
	font-size: 18px;
`;

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MyProfile);
