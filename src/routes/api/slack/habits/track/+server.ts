import {
	sendMessage, slackFetch
} from '$lib/slack/app';
import { MEMBER_ID } from '$env/static/private';
import * as database from '$lib/server/db';
import { habit, habitEntry } from '$lib/server/db/schema';
import type { ButtonElement, CheckboxElement, InteractiveBlockyWocky } from '$lib/slack/types';
import { gte, lte, and } from 'drizzle-orm';

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
				//console.log('Attempting to query database...');
				//console.log('Database object:', database.db);

				const habitList = await database.db.select().from(habit);
				const timezone = await getUserTimezone(request_uid) //im prob gonna be in like EST all the time anyways but we ball ig
				const {start, end} = getTodayRange(timezone)

				const todayEntries = await database.db
					.select()
					.from(habitEntry)
					.where(
						and(
							gte(habitEntry.created_at, start),
							lte(habitEntry.created_at, end)
						)
					);

				const trackedHabitIds = new Set(todayEntries.map(entry => entry.habit_id));

				console.log(habitList);

				//const now = new Date()
				//const startOfToday = new Date(now.getFullYear(), now.getMonth())

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
							text: `hi gabeywabey did you do your work today? also ur in ${timezone} today so track based on local time`
						}
					}
				];

				if (habitList.length > 0) {
					const untrackedHabits = habitList.filter(h => !trackedHabitIds.has(h.id));
					const trackedHabits = habitList.filter(h => trackedHabitIds.has(h.id));

					if (untrackedHabits.length > 0) {
						const checkboxElement: CheckboxElement = {
							type: "checkboxes",
							action_id: "habit_checkbox",
							options: untrackedHabits.map(h => ({
								text: {
									type: "plain_text",
									text: h.name,
									emoji: true
								},
								value: h.id.toString(),
							}))
						};

						blocks.push({
							type: "actions",
							block_id: "habit_checkboxes_block",
							elements: [checkboxElement]
						} as InteractiveBlockyWocky);
					}

					if (trackedHabits.length > 0) {
						const trackedText = trackedHabits
							.map(h => `~${h.name}~`)
							.join('\n');

						blocks.push({
							type: "section",
							text: {
								type: "mrkdwn",
								text: `completed: \n${trackedText}`
							}
						} as InteractiveBlockyWocky);
					}

					if (untrackedHabits.length === 0) {
						blocks.push({
							type: "section",
							text: {
								type: "mrkdwn",
								text: "**everything finished for today**"
							}
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
				}
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


const getUserTimezone = async (userId: string): Promise<string> => {
	try {
		const response = await slackFetch("users.info", { user: userId });
		const userInfo = await response.json();
		return userInfo.user.tz || 'America/New_York';
	} catch (error) {
		console.error('failed to get user timezone:', error);
		//genuinely might be missing scope
		return 'America/New_York';
	}
}

function getTodayRange(timezone: string): { start: Date; end: Date } {
	const now = new Date();
	const userNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));

	const start = new Date(userNow.getFullYear(), userNow.getMonth(), userNow.getDate());
	const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

	return { start, end };
}