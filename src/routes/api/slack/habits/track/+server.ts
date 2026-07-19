import {
	type ButtonElement,
	type CheckboxElement,
	type InteractiveBlockyWocky,
	sendMessage
} from '$lib/slack/app';
import { MEMBER_ID } from '$env/static/private';
import * as database from '$lib/server/db';
import { habit } from '$lib/server/db/schema';

export const POST = async ({ request }) => {
	const type = request.headers.get('content-type');

	if (type?.startsWith('application/json')) {
		const body = await request.json();
		//console.log(body)

		const result = JSON.stringify({
			challenge: body.challenge
		});

		return new Response(result);
	}

	if (type?.startsWith('application/x-www-form-urlencoded')) {
		const form = await request.formData();
		const request_uid = form.get('user_id');
		const channel_id = form.get('channel_id') as string;
		//console.log(request_uid)

		if (request_uid !== MEMBER_ID) {
			return sendMessage(form.get('channel_id') as string, 'not authorized! you not the owner :(');
		} else {
			try {
				console.log('Attempting to query database...');
				console.log('Database object:', database.db);

				const habitList = await database.db.select().from(habit);

				console.log(habitList);

				//const habitListString = habitList.map((h) => `${h.name} : ${h.id}`).join(`\n`)

				const blocks: InteractiveBlockyWocky[] = [
					{
						type: 'header',
						text: {
							type: 'plain_text',
							text: 'habittracking',
							emoji: false
						}
					},

					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: 'hi gabeywabey did you do your work today'
						}
					}
				];

				if (habitList.length > 0) {
					const checkboxElement: CheckboxElement = {
						type: 'checkboxes',
						action_id: 'habit_checkbox',
						options: habitList.map((h) => ({
							text: {
								type: 'plain_text',
								text: h.name,
								emoji: true
							},
							value: h.id.toString()
						}))
					};
					blocks.push({
						type: 'actions',
						block_id: 'habit_checkboxes_block',
						elements: [checkboxElement]
					} as InteractiveBlockyWocky);
				}
				const trackButton: ButtonElement = {
					type: 'button',
					text: {
						type: 'plain_text',
						text: 'type stuff',
						emoji: true
					},
					style: 'primary',
					value: 'track_habits_click',
					action_id: 'track_habits'
				};

				blocks.push({
					type: 'actions',
					block_id: 'track_button_block',
					elements: [trackButton]
				});

				return sendMessage(channel_id, `bleh`, blocks);
			} catch (e) {
				console.error("Database query fuckup:", e);
				if (e instanceof Error) return sendMessage(channel_id, `Error: ${e.message}`);
				else return sendMessage(channel_id, "random ass error idk")
			}
		}
	}

	//console.log(form)

	/*
	const result = JSON.stringify({
		form
	})

	return new Response(result)*/

	//console.log("channel_name: ", form.get("channel_name"));
	//console.log("command: ", form.get("command"));
	//console.log("user_id: ", form.get("user_id"));
};
