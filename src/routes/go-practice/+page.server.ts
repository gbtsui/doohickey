import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	test: async ({request, fetch}) => {
		const data = await request.formData()
		const silly_payload = data.get("silly_payload")
		const response = await fetch("/lets-go/test", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"  //today i learned that headers are lowk very important
			},
			body: JSON.stringify({
				"body": "two plus two is four minus one that's three quick maths",
				"silly_payload": Number(silly_payload),
			}),
		})

		if (!response.ok) {
			const errorData = await response.json();
			return {
				success: false,
				error: errorData.error || "oopsie woopsie! the code killed itself! i have no idea what went wrong :3"
			};
		}


		const result = await response.json()

		return {
			success: true,
			data: result
		}
	},

	//your eyes were filled with stars so you picked up a guitar and how the people gave the attention that you crave
	//tonight the stage is yours but the world has watched you rise and fall a thousand times before
	//polka never dies
	//so when your face is gone the dance will carry on and you'll rot down in your grave with the souls you couldn't save
	//tonight the stage was yours how they loved your moans and sighs but the reaper loved you more
	//polka never dies
	//come all you indie hipster darlings and new pop country starlings to the main street legion hall look into my crystal ball
	//emo screamo polka never dies last call dance hall polka never dies
	//you'll be the first against the wall
	//and polka never dies
}