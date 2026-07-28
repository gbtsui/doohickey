import * as database from "$lib/server/db";
import { habit, habitEntry } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import {gte} from 'drizzle-orm';
import { ListOfHabitsSchema } from '$lib/server/zod/schema';

export const GET = async () => {
	try {
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);


		const result = await database.db.query.habit.findMany({
			with: {
				entries: {
					where: gte(habitEntry.created_at, thirtyDaysAgo),
					orderBy: (entries, { desc }) => [desc(entries.created_at)]
				}
			}
		}).from(habit);


		/*
		const result = await database.db.select().from(habit).where({

		})


		 */
		console.log(result);
		/*

		const result = await database.db
			.select()
			.from(habitEntry) //bro i had the wrong fricking table
			.where(gte(habitEntry.created_at, thirtyDaysAgo));

		 */

		const validated = ListOfHabitsSchema.safeParse(result);

		if (!validated.success) {
			console.error("oopsie poopsie! validation error:", validated)
			return json({success: false, error: validated.error})
		}

		return json({success: true, data: result}, {status: 200});
	} catch (err) {
		console.error(err)
		return json({success: false, error: err})
	}
}
//my database killed itself bruh
//woof woof ig
