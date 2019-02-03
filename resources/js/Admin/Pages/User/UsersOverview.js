import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import {
	getUsers,
	updateUserRole,
	deleteUser,
	searchUsers
} from "../../Store/Actions/UserActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button as BloomerButton } from "bloomer";
import { PageWrapper, CenteredItem } from "../../Components/Layout";
import RolesDropdown from "../../Components/RolesDropdown";
import CardBase from "../../Components/Card";
import Snackbar from "../../../Shared/Components/Snackbar";
import Pagination from "../../Components/Pagination";
import { Spacer } from "../../Components/Helpers";
import OverviewTable from "../../Components/OverviewTable";

class UsersOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasSuccess: false,
			successMessage: "",
			deleteAction: {
				user: null,
				loading: false
			}
		};
		this.fetchUsersPage = this.fetchUsersPage.bind(this);
		this.clearSuccess = this.clearSuccess.bind(this);
		this.fetchNextPage = this.fetchNextPage.bind(this);
		this.fetchPrevPage = this.fetchPrevPage.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.searchUsers = this.searchUsers.bind(this);
	}

	componentDidMount() {
		if (this.props.users.data.length === 0) {
			this.props.getUsers();
		}
	}

	clearSuccess() {
		this.setState({ hasSuccess: false });
	}

	fetchUsersPage(page) {
		this.props.getUsers(page);
	}

	fetchNextPage() {
		if (!this.props.users.isLastPage) {
			this.props.getUsers(this.props.users.currentPage + 1);
		}
	}

	fetchPrevPage() {
		if (!this.props.users.isFirstPage) {
			this.props.getUsers(this.props.users.currentPage - 1);
		}
	}

	async deleteUser(userId) {
		this.clearSuccess();
		this.setState({
			deleteAction: {
				user: userId,
				loading: true
			}
		});
		const response = await Promise.resolve(this.props.deleteUser(userId));
		if (response) {
			this.setState({
				...this.state,
				deleteAction: {
					loading: false,
					user: null
				},
				hasSuccess: true,
				successMessage: response.payload.data.message
			});
		}
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

	async searchUsers(query) {
		if (query.length === 0) {
			this.props.getUsers(this.props.users.currentPage);
		} else {
			this.props.searchUsers(query);
		}
	}

	render() {
		const { loadingActiveUser, users, loadingUsers } = this.props;
		const { hasSuccess, successMessage, deleteAction } = this.state;
		return (
			<PageWrapper
				pageTitle="Pregled uporabnikov"
				hasSearchForm={true}
				onSearch={this.searchUsers}
				searchPlaceholder="Išči med uporabniki..."
			>
				<Snackbar
					purpose="success"
					isOpen={hasSuccess}
					message={successMessage}
					dissmissAction={this.clearSuccess}
				/>
				<Card>
					{loadingUsers || loadingActiveUser ? (
						<CenteredItem>
							<Spinner icon="circle-notch" spin size="2x" />
						</CenteredItem>
					) : users.data.length > 0 ? (
						<Table>
							<thead>
								<tr>
									<th>Ime in priimek</th>
									<th>E-pošta</th>
									<th>Vloga</th>
									<th />
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
										<OnlyDesktopField>{user.email}</OnlyDesktopField>
										<RoleField>
											<RolesDropdown
												user={user}
												icon="chevron-down"
												handleClick={this.updateUserRole.bind(this)}
											/>
										</RoleField>
										<ActionField>
											<DeleteButton onClick={() => this.deleteUser(user.id)}>
												{deleteAction.loading &&
												deleteAction.user === user.id ? (
													<FontAwesomeIcon icon="circle-notch" spin size="1x" />
												) : (
													<FontAwesomeIcon icon="trash-alt" size="1x" />
												)}
											</DeleteButton>
										</ActionField>
									</TableRow>
								))}
							</tbody>
						</Table>
					) : (
						<ResultsNotFound>
							<p>Za iskalni niz ni najdenih rezultatov...</p>
						</ResultsNotFound>
					)}
					<Spacer />
					{users.totalPages > 1 && (
						<Pagination
							isFirstPage={users.isFirstPage}
							isLastPage={users.isLastPage}
							currentPage={users.currentPage}
							fetchNewPage={this.fetchUsersPage}
							totalPages={users.totalPages}
						/>
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
	min-height: calc(100vh - 200px);
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 768px) {
		margin-top: 30px;
		min-height: calc(100vh - 200px);
		padding: 20px 0;
	}
`;

const Table = styled(OverviewTable)`
	margin-top: 0;
`;

const Spinner = styled(FontAwesomeIcon)`
	color: ${props => props.theme.mainColor};
`;

const TableRow = styled.tr`
	td {
		padding-top: 15px;
		padding-bottom: 15px;
		vertical-align: middle;
	}
`;

const OnlyDesktopField = styled.td`
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const NameField = styled.td`
	clear: both;
`;

const RoleField = styled.td`
	width: 120px;
`;

const ActionField = styled.td`
	width: 80px;
	text-align: center;
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
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

const AvatarContainerPlaceholder = styled(AvatarContainer)`
	align-items: center;
	justify-content: center;
	color: ${props => props.theme.darkGray};
`;

const DeleteButton = styled(BloomerButton)`
	margin-right: auto;
  border-color: ${props => props.theme.colorError};
  background-color: transparent;
	color: ${props => props.theme.colorError};
  font-size: 14px;
  transition ${props => props.theme.easeTransition};
  &:focus {
    color: ${props => props.theme.white};
  }
  &:active {
    color: ${props => props.theme.white};
  }
  &:hover {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.colorError};
    border-color: ${props => props.theme.colorError};
  }
`;

const ResultsNotFound = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	p {
		font-size: 22px;
		color: ${props => props.theme.heavyGray};
		font-weight: 900;
		@media screen and (max-width: 768px) {
			padding: 0 20px;
			font-size: 18px;
			text-align: center;
		}
	}
`;

const mapStateToProps = state => ({
	activeUser: state.user.user,
	loadingActiveUser: state.user.loading,
	users: state.user.allUsers,
	loadingUsers: state.user.loadingAllUsers
});

const mapDispatchToProps = {
	getUsers,
	updateUserRole,
	deleteUser,
	searchUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersOverview);
