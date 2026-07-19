//slack client woooooo

/*

import { App } from "@slack/bolt";

export const slack = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET,
});

slack.message("hello", async ({ message, say }) => {
	await say(`Hi <@${message.user}>!`);
});

*/

const API = "https://slack.com/api"

import {SLACK_BOT_TOKEN} from "$env/static/private"

export const slackFetch = async (endpoint: string, body: object) => {

	//console.log(SLACK_BOT_TOKEN)
	const response = await fetch(`${API}/${endpoint}`, {
		method: "POST",
		headers: {
			//Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
			Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	const result = await response.json()

	if (!result.ok) {
		throw new Error(result.error);
	}

	return new Response(result.body)
	//return result
}

/*
export const handleMessage = (event: object) => {
	if (event.text === "ping"){
		return sendMessage(event.channel, "pong")
	}
}

 */

/*
type InteractiveBlockywocky = {
	type: string,
	text: {
		type: "plain_text" | "mrkdwn",
		text: string,
		emoji?: boolean
	}
}

 */

export type PlainText = {
	type: "plain_text";
	text: string;
	emoji?: boolean;
};

export type MrkdwnText = {
	type: "mrkdwn";
	text: string;
	verbatim?: boolean;
};

export type SlackText = PlainText | MrkdwnText;

export type ButtonElement = {
	type: "button";
	text: PlainText;
	action_id?: string;
	url?: string;
	value?: string;
	style?: "default" | "primary" | "danger";
	confirm?: ConfirmationDialog;
};

export type SelectOption = {
	text: PlainText;
	value: string;
	description?: PlainText;
	url?: string;
};

export type StaticSelectElement = {
	type: "static_select";
	placeholder: PlainText;
	action_id?: string;
	options: SelectOption[];
	option_groups?: {
		label: PlainText;
		options: SelectOption[];
	}[];
	initial_option?: SelectOption;
	confirm?: ConfirmationDialog;
};

export type DatePickerElement = {
	type: "datepicker";
	action_id?: string;
	placeholder?: PlainText;
	initial_date?: string;
	confirm?: ConfirmationDialog;
};

export type OverflowElement = {
	type: "overflow";
	action_id?: string;
	options: SelectOption[];
	confirm?: ConfirmationDialog;
};

export type CheckboxElement = {
	type: "checkboxes";
	action_id?: string;
	options: {
		text: MrkdwnText | PlainText;
		description?: MrkdwnText | PlainText;
		value: string;
	}[];
	initial_options?: {
		text: MrkdwnText | PlainText;
		value: string;
	}[];
	confirm?: ConfirmationDialog;
};

export type RadioButtonElement = {
	type: "radio_buttons";
	action_id?: string;
	options: {
		text: MrkdwnText | PlainText;
		description?: MrkdwnText | PlainText;
		value: string;
	}[];
	initial_option?: {
		text: MrkdwnText | PlainText;
		value: string;
	};
	confirm?: ConfirmationDialog;
};

export type TimePickerElement = {
	type: "timepicker";
	action_id?: string;
	placeholder?: PlainText;
	initial_time?: string;
	confirm?: ConfirmationDialog;
};

export type DateTimePickerElement = {
	type: "datetimepicker";
	action_id?: string;
	initial_date_time?: number;
	confirm?: ConfirmationDialog;
};

export type MultiSelectElement = {
	type: "multi_static_select";
	placeholder: PlainText;
	action_id?: string;
	options: SelectOption[];
	max_selected_items?: number;
	confirm?: ConfirmationDialog;
};

export type RichTextInputElement = {
	type: "rich_text_input";
	action_id?: string;
	placeholder?: PlainText;
	initial_value?: string;
	focus_on_load?: boolean;
	dispatch_action_config?: {
		trigger_actions_on?: ("on_character_entered" | "on_enter_pressed")[];
	};
};

export type WorkflowButtonElement = {
	type: "workflow_button";
	text: PlainText;
	workflow: {
		trigger: {
			url: string;
			customizable_input_parameters?: {
				name: string;
				value: string;
			}[];
		};
	};
	action_id?: string;
	style?: "default" | "primary" | "danger";
};

export type ActionElement =
	| ButtonElement
	| StaticSelectElement
	| DatePickerElement
	| OverflowElement
	| CheckboxElement
	| RadioButtonElement
	| TimePickerElement
	| DateTimePickerElement
	| MultiSelectElement
	| RichTextInputElement
	| WorkflowButtonElement;

export type HeaderBlock = {
	type: "header";
	text: PlainText;
	block_id?: string;
};

export type SectionBlock = {
	type: "section";
	text?: MrkdwnText | PlainText;
	fields?: (MrkdwnText | PlainText)[];
	accessory?: ActionElement;
	block_id?: string;
};

export type DividerBlock = {
	type: "divider";
	block_id?: string;
};

export type ImageBlock = {
	type: "image";
	image_url: string;
	alt_text: string;
	title?: PlainText;
	block_id?: string;
};

export type ActionsBlock = {
	type: "actions";
	elements: ActionElement[];
	block_id?: string;
};

export type ContextBlock = {
	type: "context";
	elements: (ImageElement | MrkdwnText | PlainText)[];
	block_id?: string;
};

export type InputBlock = {
	type: "input";
	label: PlainText;
	element: ActionElement;
	dispatch_action?: boolean;
	block_id?: string;
	hint?: PlainText;
	optional?: boolean;
};

export type ImageElement = {
	type: "image";
	image_url: string;
	alt_text: string;
};

export type FileBlock = {
	type: "file";
	external_id: string;
	source: string;
	block_id?: string;
};

export type VideoBlock = {
	type: "video";
	video_url: string;
	thumbnail_url: string;
	title: PlainText;
	alt_text: string;
	title_url?: string;
	description?: PlainText;
	provider_name?: string;
	provider_icon_url?: string;
	author_name?: string;
	block_id?: string;
};

export type ConfirmationDialog = {
	title?: PlainText;
	text: MrkdwnText | PlainText;
	confirm?: PlainText;
	deny?: PlainText;
	style?: "primary" | "danger";
};

export type InteractiveBlockyWocky =
	| HeaderBlock
	| SectionBlock
	| DividerBlock
	| ImageBlock
	| ActionsBlock
	| ContextBlock
	| InputBlock
	| FileBlock
	| VideoBlock;

export type SlackResponse = {
	ok: boolean;
	error?: string;
	channel?: string;
	ts?: string;
	message?: {
		text: string;
		username: string;
		bot_id?: string;
		type: string;
		subtype?: string;
		ts: string;
	};
};

export const sendMessage = (channel: string, text: string, blocks?: InteractiveBlockyWocky[]) =>  {
	return slackFetch("chat.postMessage", {
		channel,
		text,
		blocks
	})
}

export const addReaction = (channel: string, timestamp: string, name: string) => {
	return slackFetch("reactions.add", {
		channel,
		timestamp,
		name
	})
}