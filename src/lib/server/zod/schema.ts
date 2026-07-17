import z from 'zod';

export const HabitSchema = z.object({
	name: z.string().min(1, "gotta name yo habit gng").max(100),
	description: z.string().max(500),
	weeklyGoal: z.number().int().min(0).max(7)
})

