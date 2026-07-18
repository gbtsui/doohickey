import { handleEvent } from '$lib/slack/app';

export const POST = async ({ request }) => {
	//verify signature hnnnnnnng

	const body = await request.json();

	switch (body.type) {
		case 'url_verification':
			return new Response(body.challenge);
		case "event_callback":
			return handleEvent(body.event)
	}

	return new Response('OK');
};
