import { env } from '@/config/env.js';
import { AUTH_ROUTES_CLIENT } from '@trickcal-bug-tracker/shared';

const getClientOauthRedirectURL = (token: string) => {
    return `${env.client_uri}${AUTH_ROUTES_CLIENT.authCallback}#token=${token}`;
};

export { getClientOauthRedirectURL };
