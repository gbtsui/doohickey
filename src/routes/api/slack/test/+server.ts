import { sendMessage } from '$lib/slack/app';

export const POST = async ({ request }) => {
	//verify signature hnnnnnnng
	console.log("test run")

	console.log(request)
	const type = request.headers.get("content-type");

	if (type?.startsWith("application/json")) {
		const body = await request.json();
		//console.log(body)

		const result = JSON.stringify({
			"challenge": body.challenge
		})

		return new Response(result)
	}

	if (type?.startsWith("application/x-www-form-urlencoded")) {
		const form = await request.formData();

		//console.log(form)

		/*
		const result = JSON.stringify({
			form
		})

		return new Response(result)*/

		//console.log("channel_name: ", form.get("channel_name"));
		//console.log("command: ", form.get("command"));
		//console.log("user_id: ", form.get("user_id"));

		return sendMessage(form.get("channel_id") as string, "hi lol")
	}

	/*
	switch (body.type) {
		case 'url_verification':
			return new Response(body.challenge);
		case "event_callback":
			return handleEvent(body.event)
	}*/

	//return new Response('OK');
};
