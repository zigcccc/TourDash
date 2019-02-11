import React from "react";
import classNames from "classnames";
import { Avatar } from "../Elements";
import styled from "styled-components";
import _times from "lodash/times";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Review = props => (
	<ReviewContainer
		className={classNames({
			[props.className]: true
		})}
	>
		<div className="content">
			<Avatar
				src={"/images/uploads/" + props.review.author.avatar}
				alt={props.review.author.name}
				size={40}
			/>
			<p className="author-name">{props.review.author.name}</p>
			<StarsContainer>
				{_times(Math.floor(props.review.rating)).map((v, i) => {
					return <FontAwesomeIcon key={i} icon="star" />;
				})}
				{props.review.rating - Math.floor(props.review.rating) !== 0 ? (
					<FontAwesomeIcon icon="star-half-alt" />
				) : null}
				{_times(5 - Math.ceil(props.review.rating)).map((v, i) => {
					return <FontAwesomeIcon key={i} icon="star" className="disabled" />;
				})}
			</StarsContainer>
			<p className="review">{props.review.review}</p>
			{props.hasTitle && (
				<small className="accommodation">
					Za namestitev: {props.review.accommodation.title}
				</small>
			)}
		</div>
	</ReviewContainer>
);

const ReviewContainer = styled.div`
	background: white;
	border-radius: 5px;
	width: 100%;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	}
	.author-name {
		font-size: 0.95rem;
	}
	.review {
		margin-top: 20px;
		margin-bottom: 30px;
	}
	.accommodation {
		opacity: 0.75;
	}
`;

const StarsContainer = styled.div`
	svg {
		color: ${props => props.theme.colorWarning};
		&.disabled {
			opacity: 0.25;
			color: ${props => props.theme.darkGray};
		}
	}
	@media screen and (max-width: 768px) {
		margin-top: 7px;
	}
`;

export default Review;
