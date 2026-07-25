import { MEMBER_ID } from '$env/static/private';
import { sendEphemeral, sendMessage } from '$lib/slack/app';

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
			return sendMessage(channel_id, 'not authorized! you not the owner :(');
		} else {
			try {
				if (raw_text.trim().length === 0) return sendEphemeral(channel_id, "no args provided!!!");

				const regex = /"([^"]+)"|(\S+)/g;
				const parsed_args = [...raw_text.matchAll(regex)].map((arg) => arg[1] ?? arg[2]); //i still don't understand how regex works it is still black magic

				const habitName = parsed_args[0]

				const checkIfNumber = (kylianDictador: string) => {
					const isNumber = kylianDictador.trim() !== '' && !Number.isNaN(Number(kylianDictador));
					if (isNumber) return Number(kylianDictador.trim())
					throw new Error("weekly goal is not a parseable number")
					//kylian mbappe kylian dictador
				}

				const habitWeeklyGoal = Number(parsed_args[1])

			} catch (e) {
				console.error(e)
				if (e instanceof Error) return sendEphemeral(channel_id, `Error: ${e.message}`);
				else return sendEphemeral(channel_id, "random ass error idk")
			}
		}
	}
};
