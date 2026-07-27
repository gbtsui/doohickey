//ohhhh BROTHER
//okay ts gotta be read so it's a GET
//maybe cache too?

//im stupid ts was for entering

/*
import * as database from "$lib/server/db";
import { habit } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import {gte} from 'drizzle-orm';

export const GET = async () => {
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const result = await database.db
		.select()
		.from(habit)
		.where(gte(habit.created_at, thirtyDaysAgo.toISOString()));

	return json({success: true, data: result}, {status: 200});
}

 */