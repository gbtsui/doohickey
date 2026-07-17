//neue deutsche

import { error, json } from '@sveltejs/kit';
import * as database from '$lib/server/db';
import { habit } from '$lib/server/db/schema';
import { HabitRequestSchema } from '$lib/server/zod/schema';
import { verifyToken } from '$lib/server/password';

export const POST = async ({ request }) => {
	//alle varten auf das licht
	/*
	request stuff:
	need name, description, weekly goal

	 */

	//const {name, description, weeklyGoal} = await request.json()
	const reqBody = await request.json();
	//const {name, description, weeklyGoal} = await HabitSchema.parseAsync(reqBody);
	const zodResult =  HabitRequestSchema.safeParse(reqBody);

	if (!zodResult.success) {
		return json(
			{
				success: false,
				errors: zodResult.error
			},
			{ status: 400 }
		);
	}

	const { name, description, weeklyGoal, OTP } = zodResult.data;

	const OTPSuccess = await verifyToken(OTP)

	if (!OTPSuccess.valid) {
		return json(
			{
				success: false,
				errors: "Wrong OTP"
			},
			{ status: 401}
		)
	}

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
