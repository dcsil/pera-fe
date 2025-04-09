import { getCookie, setCookie } from "@/utils/cookies";

const TOKEN_COOKIE_NAME = "token";

/**
 * Saves user login information by persisting it in cookies.
 *
 * Since the BE and FE servers (currently) have different domains, if BE were to set
 * the cookie in the login response, it would be have to set `SameSite` to `None`
 * for the cookie to be included in subsequent requests. FE would also not have access
 * to the cookie, which is not ideal because FE can't pre-filter routes.
 *
 * For now, we programmatically presist the auth token in a cookie.
 *
 * @param token - The user's authentication token.
 * @param expiry - The expiration date of the token, represented in a date format
 * parsable by {@link Date.parse()}.
 */
export function login(token: string, expiry: string) {
    // Convert expiry to max age
    const maxAge = (Date.parse(expiry) - Date.now()) / 1000;
    console.log(`maxAge is ${maxAge}`);
    setCookie(TOKEN_COOKIE_NAME, token, maxAge, true);
}

/**
 * Forwards the `url` and `options` arguments to `fetch`, but with the auth token
 * appended as a header that the BE expects.
 *
 * @param url
 * @param options - Optional request options.
 * @returns The returned `Promise` of the `fetch` call, or `null` if the auth token
 * does not exist.
 * @throws {Error} if the authorization token already exists in `options.headers`.
 */
export function fetchAuth(url: string, options?: RequestInit) {
    const token = getCookie(TOKEN_COOKIE_NAME);
    if (token === null) {
        return null;
    }
    const headers = new Headers(options?.headers ?? {});
    if (headers.has("Authorization")) {
        throw new Error("Authorization header already exists in the request");
    }
    else {
        headers.append("Authorization", `Token ${token}`);
    }
    return fetch(url, { ...options, headers });
}
