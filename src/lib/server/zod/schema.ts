import z from 'zod';

export const HabitRequestSchema = z.object({
	name: z.string().min(1, "gotta name yo habit gng").max(100),
	description: z.string().max(500),
	weeklyGoal: z.coerce.number().int().min(0).max(7),
	OTP: z.string().length(6),
})


export const HabitEntrySchema = z.object({
	created_at: z.date(),
	id: z.string(),
	habit_id: z.string(),
})

export const HabitSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	weeklyGoal: z.coerce.number(),
	entries: z.array(HabitEntrySchema),
})

export const ListOfHabitsSchema = z.array(HabitSchema)

