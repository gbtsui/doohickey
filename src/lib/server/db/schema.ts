import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm"

export const habit = pgTable("habit", {
	id: uuid("id").defaultRandom().primaryKey(),
	description: text("description").notNull(),
	name: text("name").notNull(),
	weeklyGoal: integer("weeklyGoal").default(0),
});

export const habitEntry = pgTable("habit_entry", {
	id: uuid("id").defaultRandom().primaryKey(),
	habit_id: uuid("habit_id")
		.notNull()
		.references(() => habit.id, { onDelete: "cascade" }),
	created_at: timestamp("created_at").defaultNow().notNull(),
});

export const habitRelations = relations(habit, ({ many }) => ({
	entries: many(habitEntry)
}));

export const habitEntryRelations = relations(habitEntry, ({ one }) => ({
	habit: one(habit, {
		fields: [habitEntry.habit_id],
		references: [habit.id]
	})
}));