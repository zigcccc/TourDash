import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { getUsers, updateUserRole } from "../../Store/Actions/UserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Table,
	Pagination,
	PageList,
	Page,
	PageLink,
	PageEllipsis
} from "bloomer";
import { PageWrapper, CenteredItem } from "../../Components/Layout";
import RolesDropdown from "../../Components/RolesDropdown";
import CardBase from "../../Components/Card";
import Snackbar from "../../../Shared/Components/Snackbar";

class UsersOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSuccess: false,
			successMessage: ""
		};
		this.clearSuccess = this.clearSuccess.bind(this);
	}

	componentDidMount() {
		this.props.getUsers();
	}

	clearSuccess() {
		this.setState({ hasSuccess: false });
	}

	async updateUserRole(userId, role) {
		this.clearSuccess();
		try {
			const response = await this.props.updateUserRole(userId, role);
			if (response) {
				this.setState({
					hasSuccess: true,
					successMessage: response.payload.data.message.success
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const { activeUser, users, loadingUsers } = this.props;
		const { hasSuccess, successMessage } = this.state;
		return (
			<PageWrapper pageTitle="Pregled uporabnikov">
				<Snackbar
					purpose="success"
					isOpen={hasSuccess}
					message={successMessage}
					dissmissAction={this.clearSuccess}
				/>
				<Card>
					{loadingUsers ? (
						<CenteredItem>
							<Spinner icon="circle-notch" spin size="2x" />
						</CenteredItem>
					) : (
						<UsersTable isNarrow={false} className="is-hoverable">
							<thead>
								<tr>
									<th>Ime in priimek</th>
									<th>E-pošta</th>
									<th>Vloga</th>
								</tr>
							</thead>
							<tbody>
								{users.data.map(user => (
									<TableRow key={user.id}>
										<NameField>
											{user.avatar ? (
												<AvatarContainer>
													<img src={user.avatar} alt={user.name} />
												</AvatarContainer>
											) : (
												<AvatarContainerPlaceholder>
													<FontAwesomeIcon icon="user" size="lg" />
												</AvatarContainerPlaceholder>
											)}
											{user.name}
										</NameField>
										<td>{user.email}</td>
										<RoleField>
											<RolesDropdown
												user={user}
												handleClick={this.updateUserRole.bind(this)}
											/>
										</RoleField>
									</TableRow>
								))}
							</tbody>
						</UsersTable>
					)}
				</Card>
			</PageWrapper>
		);
	}
}

UsersOverview.propTypes = {
	activeUser: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		email: PropTypes.string,
		avatar: PropTypes.string,
		role: PropTypes.oneOf(["admin", "superadmin"])
	}),
	users: PropTypes.shape({
		data: PropTypes.array,
		isLastPage: PropTypes.bool,
		isFirstPage: PropTypes.bool,
		totalPages: PropTypes.number,
		currentPage: PropTypes.number
	})
};

const Card = styled(CardBase)`
	margin-top: 45px;
	min-height: 50vh;
`;

const Spinner = styled(FontAwesomeIcon)`
	color: ${props => props.theme.mainColor};
`;

const UsersTable = styled(Table)`
	width: 100%;
`;

const TableRow = styled.tr`
	td {
		padding-top: 15px;
		padding-bottom: 15px;
		vertical-align: middle;
	}
`;

const NameField = styled.td`
	clear: both;
`;

const RoleField = styled.td`
	width: 120px;
`;

const AvatarContainer = styled.div`
	border-radius: 50%;
	width: 25px;
	height: 25px;
	overflow: hidden;
	display: flex;
	margin-right: 10px;
	float: left;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

const AvatarContainerPlaceholder = styled(AvatarContainer)`
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.darkGray};
`;

const mapStateToProps = state => ({
	activeUser: state.user.user,
	users: state.user.allUsers,
	loadingUsers: state.user.loadingAllUsers
});

const mapDispatchToProps = {
	getUsers,
	updateUserRole
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersOverview);
