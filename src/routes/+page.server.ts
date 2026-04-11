import { env } from '$env/dynamic/private';

export async function load() {
	const { DATABASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;

	return {
		DATABASE_URL,
		GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET
	};
}
