import { google } from "@lib/server/oauth";
import { generateCodeVerifier, generateState } from "arctic";

import type { APIContext } from "astro";

export function GET(context: APIContext): Response {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"]);

	context.cookies.set("google_oauth_state", state, {
		httpOnly: true,
		maxAge: 60 * 10,
		secure: import.meta.env.PROD,
		path: "/",
		sameSite: "lax"
	});
	context.cookies.set("google_code_verifier", codeVerifier, {
		httpOnly: true,
		maxAge: 60 * 10,
		secure: import.meta.env.PROD,
		path: "/",
		sameSite: "lax"
	});

	return context.redirect(url.toString());
}
