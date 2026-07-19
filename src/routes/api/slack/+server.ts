//import { handleEvent } from '$lib/slack/app';

import { MEMBER_ID } from '$env/static/private';

export const POST = async ({ request }) => {
	//verify signature hnnnnnnng

	/*
	const body = await request.json();

	switch (body.type) {
		case 'url_verification':
			return new Response(body.challenge);
		case "event_callback":
			return handleEvent(body.event)
	}

	return new Response('OK');

	 */

	//do something idjgfka

	const form = await request.formData();
	const payload = JSON.parse(form.get('payload') as string);

	//console.log(payload);

	if (payload.user.id !== MEMBER_ID) {
		//send ephemeral message ashjkgfdsa
		return new Response(null, { status: 200 });
	}


	if (payload.type === 'block_actions') {
		const { actions, channel, message, response_url, user } = payload;

		console.log(actions)
		console.log(payload.state.values)
		console.log(payload.state.values.habit_checkboxes_block.habit_checkbox.selected_options)
		const trackAction = actions.find((action: any) => action.action_id === 'track_habits');
		if (trackAction) {
			const selectedHabits: Array<{ id: string; name: string }> = [];

			console.log("---BRRRR LOGS STARTING BRRRR---")
			Object.entries(payload.state.values).forEach(([blockId, blockState]: [string, any]) => {
				Object.entries(blockState).forEach(([actionId, actionState]: [string, any]) => {
					if (actionId === 'habit_checkbox' && actionState.selected_options) {
						console.log("habit checkbox id")

						actionState.selected_options.forEach((option: any) => {
							console.log({id: option.value, name: option.text.text});

							selectedHabits.push({id: option.value, name: option.text.text})
						})
					}
				});
			});

			console.log("selected habits", selectedHabits)
		}
	}

	return new Response('ok');
};
