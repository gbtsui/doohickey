//neue deutsche

import { error, json } from '@sveltejs/kit';
import * as database from '$lib/server/db';
import { habit } from '$lib/server/db/schema';
import { HabitSchema } from '$lib/server/zod/schema';

export const POST = async ({ request }) => {
	//alle varten auf das licht
	/*
	request stuff:
	need name, description, weekly goal

	 */

	//const {name, description, weeklyGoal} = await request.json()
	const reqBody = await request.json();
	//const {name, description, weeklyGoal} = await HabitSchema.parseAsync(reqBody);
	const zodResult =  HabitSchema.safeParse(reqBody);

	if (!zodResult.success) {
		return json(
			{
				success: false,
				errors: zodResult.error
			},
			{ status: 400 }
		);
	}

	const { name, description, weeklyGoal } = zodResult.data;

	console.log(name, description, weeklyGoal);

	try {
		const [newHabit] = await database.db
			.insert(habit)
			.values({
				name,
				description,
				weeklyGoal
			})
			.returning();

		return json(
			{
				success: true,
				data: newHabit
			},
			{ status: 201 }
		);
	} catch (e) {
		console.error(e);
		if (e instanceof Error) {
			return error(500, e.message);
		} else {
			return error(500);
		}
	}
};
