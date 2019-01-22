import React from "react";
import styled from "styled-components";
import { Field, Label, Control, Input, TextArea } from "bloomer";
import MainCta from "../../../Shared/Components/MainCta";

const labelMap = {
	name: "Ime in priimek",
	email: "E-pošta",
	subject: "Zadeva",
	message: "Sporočilo"
};

const HandleContactForm = ({ block }) => {
	return (
		<form>
			{Object.keys(block.data.fields).map(
				field =>
					block.data.fields[field] && (
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
			<SendButton
				handleClick={event => event.preventDefault()}
				text={block.data.sendText}
				fontSize={14}
			/>
		</form>
	);
};

const SendButton = styled(MainCta)`
	min-width: unset;
	padding: 1em 1.25em;
`;

export default HandleContactForm;
