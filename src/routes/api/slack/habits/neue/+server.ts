import { MEMBER_ID } from '$env/static/private';
import { sendEphemeral, sendMessage } from '$lib/slack/app';import { getToken } from '$lib/server/password';
import { HabitRequestSchema } from '$lib/server/zod/schema';
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
		const request_uid = form.get('user_id') as string;
		const channel_id = form.get('channel_id') as string;
		const raw_text = form.get('text') as string;

		if (request_uid !== MEMBER_ID) {
			return sendMessage({channel: channel_id, text: 'not authorized! you not the owner :('});
		} else {
			try {
				if (raw_text.trim().length === 0) return sendEphemeral({channel: channel_id, text: "no args provided!!!", user: request_uid});

				const regex = /"([^"]+)"|(\S+)/g;
				const parsed_args = [...raw_text.matchAll(regex)].map((arg) => arg[1] ?? arg[2]); //i still don't understand how regex works it is still black magic

				/*
				const habitName = parsed_args[0]

				const checkIfNumber = (kylianDictador: string) => {
					const isNumber = kylianDictador.trim() !== '' && !Number.isNaN(Number(kylianDictador));
					if (isNumber) return Number(kylianDictador.trim())
					throw new Error("weekly goal is not a parseable number")
					//kylian mbappe kylian dictador
				}

				const habitDescription = parsed_args[1]

				checkIfNumber(parsed_args[2]) //ts will throw if screw up :P
				const habitWeeklyGoal = Number(parsed_args[2])

				const OTP = await getToken()

				 */

				const unverified = {
					name: parsed_args[0],
					description: parsed_args[1],
					weeklyGoal: parsed_args[2],
					OTP: await getToken()
				}
				console.log("unverified: ", unverified)
				const zodResult = HabitRequestSchema.safeParse(unverified);

				if (!zodResult.success) return sendEphemeral({channel: channel_id, text: zodResult.error.toString(), user: request_uid});

				const {name, description, weeklyGoal } = zodResult.data; //OTP genuinely redundant

				const [newHabit] = await database.db
					.insert(habit)
					.values({
						name,
						description,
						weeklyGoal
					})
					.returning();

				return sendMessage({channel: channel_id, text: `new habit ${newHabit.name} successfully created!`})

			} catch (e) {
				console.error(e)
				if (e instanceof Error) return sendEphemeral({channel: channel_id, text: `Error: ${e.message}`, user: request_uid});
				else return sendEphemeral({channel: channel_id, text: "random ass error idk", user: request_uid})
			}
		}
	}
};

//kylian dictador is still stuck in my head help
