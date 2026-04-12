import { env } from '$env/dynamic/private';
import { ENV } from 'varlock/env';

export async function load() {
	const { DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, IS_TEST } = env;

	return {
		DATABASE_URL: ENV.DATABASE_URL,
		GOOGLE_CLIENT_ID: ENV.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: ENV.GOOGLE_CLIENT_SECRET,
		isTest: ENV.IS_TEST
	};
}
