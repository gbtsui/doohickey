//slack client woooooo

import type { InteractiveBlockyWocky } from '$lib/slack/types';
import { SLACK_BOT_TOKEN } from '$env/static/private';

const API = "https://slack.com/api"

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
		console.error(result)
		throw new Error(result.error);
	}

	return new Response(result.body)
	//return result
}


export const sendMessage = ({channel,text,blocks}:{channel: string, text: string, blocks?: InteractiveBlockyWocky[]}) =>  {
	return slackFetch("chat.postMessage", {
		channel,
		text,
		blocks
	})
}

export const addReaction = ({channel,timestamp,name}:{channel: string, timestamp: string, name: string}) => {
	return slackFetch("reactions.add", {
		channel,
		timestamp,
		name
	})
}
export const sendEphemeral = ({channel, text, blocks, user}:{channel: string, text: string,  user: string, blocks?: InteractiveBlockyWocky[]}) =>  {
	return slackFetch("chat.postEphemeral", {
		channel,
		text,
		blocks,
		user
		//response_type: "ephemeral"
		//im genuinely stupid
	})
}

