export const API_ROUTES = {  
    // GET
        // EVENTS
        ALL_EVENTS: '/event/all',
        USER_EVENTS: '/event/user-events',

        // USER
        RACER_STATS: (id: number) => `/user/${id}/stats`,

        // LEAGUES
        ALL_LEAGUES: '/league/all',

        // TRACKS
        ALL_TRACKS: '/track/all',
        
        // INSCRIPTIONS
        // CHEK AN INSCRIPTION
        CHECK_INSCRIPTION: '/inscription/check',

    // POST
        // USER AUTH
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',

        // RESULTS
        UPLOAD_RESULTS: '/result/upload',

        // EVENTS
        CREATE_EVENT: '/event/create',

        // TRACKS
        CREATE_TRACK: '/track/create',
        
        // INSCRIPTIONS
        JOIN_LEAGUE: '/inscription/join',

    // PUT
        // USER
        IRACING_ID: '/user/iracing-id',
        AVATAR_URL: '/user/avatar-url',

        // TRACKS
        UPDATE_TRACK: '/track/update',

    // DELETE
        // TRACKS
        DELETE_TRACK: '/track/delete',

        // EVENTS
        DELETE_EVENT: '/event/delete',


}