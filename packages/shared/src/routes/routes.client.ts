const AUTH_ROUTES_CLIENT = {
    authCallback: '/auth/callback',
    loginRedirect: '/auth/login',
} as const;

const AUTH_ROUTES_SERVER = {
    google: '/auth/google',
    github: '/auth/github',
} as const;

export { AUTH_ROUTES_CLIENT, AUTH_ROUTES_SERVER };
