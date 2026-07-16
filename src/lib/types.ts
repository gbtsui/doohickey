type Habit = {
	id: string;
	name: string;
	description: string;
	entries: HabitEntry[];
	weeklyGoal: number; //"how many times do you want this done per week"
}

type HabitEntry = {
	created_at: Date;
	habit_id: string;
	id: string;
}

