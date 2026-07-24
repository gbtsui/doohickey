//guess im using vercel cron now because ts will not work :broken_heart:
/*
import cron from "node-cron"
import {sendMessage} from '$lib/slack/app';
import { DEFAULT_REMINDER_CHANNEL_ID, MEMBER_ID } from '$env/static/private';


const sendReminderMessage = async () => {
	await sendMessage(
		DEFAULT_REMINDER_CHANNEL_ID,
		`@${MEMBER_ID} reminder to track your habits.`
	)
}

const sendWeeklySummary = async () => {
	await sendMessage(

	)
}

//every day @ 9pm yarrrrrrrrr (thanks cron expression tester)
const dailyReminder = cron.schedule("0 0 21 * * *", sendReminderMessage)

dailyReminder.on('execution:failed', (ctx) => {
	console.error('send failed:', ctx.execution?.error);
});

const testReminder = cron.schedule("* * * * * *", sendReminderMessage)

testReminder.on('execution:failed', (ctx) => {
	console.error('send failed:', ctx.execution?.error);
})


 */