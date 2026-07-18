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

export const sendMessage = (channel: string, text: string) =>  {
	return slackFetch("chat.postMessage", {
		channel,
		text
	})
}

export const addReaction = (channel: string, timestamp: string, name: string) => {
	return slackFetch("reactions.add", {
		channel,
		timestamp,
		name
	})
}