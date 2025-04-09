/**
 * Sets a cookie.
 *
 * `maxAge` is rounded to the nearest integer, since some browsers will ignore the
 * `max-age` attribute when giving a non-integer value.
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param maxAge - How long the cookie should persist for (in seconds).
 * Setting `maxAge = -1` (the default) causes the max-age attribute to be omitted.
 * In that case, cookie will be persisted for the current session. Setting `maxAge
 * = 0` is equivalent to deleting the cookie. Note that a "session" is
 * browser-defined, unlike for `sessionStorage`.
 * @param strict - Whether to apply `samesite=strict`, defaults to omitted (`samesite=lax`).
 */
// TODO: Sanitize names
export function setCookie(name: string, value: string, maxAge = -1, strict = false) {
    const maxAgeAttribute = maxAge === -1 ? "" : `max-age=${Math.round(maxAge)}`;
    const strictAttribute = strict ? "samesite=strict" : "";
    // Browsers normally allow the "secure" attribute on localhost, even though the
    // connection is not through HTTPS. However, Safari does not. Remove the attribute
    // when testing locally on Safari.
    document.cookie = `${name}=${encodeURIComponent(value)}; ${maxAgeAttribute}; ${strictAttribute}; path=/; secure`;
}

export function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}
