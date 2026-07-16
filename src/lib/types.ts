type Habit = {
	id: string;
	name: string;
	description: string;
	entries: HabitEntry[]
}

type HabitEntry = {
	created_at: Date;
	habit_id: string;
	id: string;
}

