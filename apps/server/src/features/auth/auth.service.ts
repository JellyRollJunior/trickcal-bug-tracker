import {
    AUTH_ROUTES_CLIENT,
    ERROR_REDIRECT_CODES,
} from '@trickcal-bug-tracker/shared';
import { env } from '@/config/env.js';

const getClientOauthRedirectURL = (token: string) => {
    return `${env.client_uri}${AUTH_ROUTES_CLIENT.authCallback}#token=${token}`;
};

const getLoginRedirectURL = (errorCode: string) => {
    const url = new URL(AUTH_ROUTES_CLIENT.loginRedirect, env.client_uri);
    url.searchParams.set('error', errorCode);
    return url.toString();
};

export { getClientOauthRedirectURL, getLoginRedirectURL };
