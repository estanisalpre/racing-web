export const API_ROUTES = {  
    // GET
        // EVENTS
        ALL_EVENTS: '/event/all',
        USER_EVENTS: '/event/user-events',

        // USER
        RACER_STATS: (id: number) => `/user/${id}/stats`,

        // LEAGUES
        ALL_LEAGUES: '/league/all',

    // POST
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    UPLOAD_RESULTS: '/result/upload',
    CREATE_EVENT: '/event/create',

    // PUT
        // USER
        IRACING_ID: '/user/iracing-id',
        AVATAR_URL: '/user/avatar-url',
}