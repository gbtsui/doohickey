
/*
//okay so basically what this is supposed to do is take the current time and date and then multiply it with the hash or whatever and then output a ten digit password, and it changes every minute
export const MakeMinutelyPassword = async () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const SUPER_SECRET_HASH = String(process.env.SECRET_HASH);


	return
}

//nvm ts too larpmaxxed and buggy apparently
 */

import {generate, verify} from "otplib"

export const getToken  = async (): Promise<string> => {
	return await generate({secret: String(process.env.SUPER_SECRET_HASH)})
}

export const verifyToken = async (token: string) => {
	return verify({secret: String(process.env.SUPER_SECRET_HASH), token})
}