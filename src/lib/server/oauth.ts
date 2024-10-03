import { Google } from "arctic";

// TODO: Update redirect URI
export const google = new Google(
	import.meta.env.GOOGLE_CLIENT_ID,
	import.meta.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:4321/login/google/callback"
);
