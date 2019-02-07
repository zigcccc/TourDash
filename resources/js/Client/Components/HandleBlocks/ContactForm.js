import React, { Component } from "react";
import styled from "styled-components";
import { Field, Label, Control, Input, TextArea } from "bloomer";
import MainCta from "../MainCta";


const labelMap = {
	name: "Ime in priimek",
	email: "E-pošta",
	subject: "Zadeva",
	message: "Sporočilo"
};

class ContactForm extends Component {
	render(){
		const { data } = this.props;
		return (
			<form>
				{Object.keys(data.fields).map(
					field =>
						data.fields[field] && (
							<Field key={field}>
								<Label>{labelMap[field]}</Label>
								<Control>
									{field !== "message" ? (
										<Input
											placeholder={labelMap[field]}
											type={field === "email" ? "email" : "text"}
										/>
									) : (
										<TextArea placeholder={labelMap[field]} />
									)}
								</Control>
							</Field>
						)
				)}
				<SendButtonContainer>
					<SendButton
						handleClick={event => event.preventDefault()}
						text={data.sendText}
						fontSize={14}
					/>
				</SendButtonContainer>
			</form>
		);
	}
};

const SendButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const SendButton = styled(MainCta)`
	min-width: unset;
	padding: 1em 1.25em;
`;

export default ContactForm;
