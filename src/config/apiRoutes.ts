export const API_ROUTES = {  
    // GET
    ALL_EVENTS: '/event/all',
    RACER_STATS: (id: number) => `/user/${id}/stats`,

    // POST
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    UPLOAD_RESULTS: '/result/upload',

    // PUT
    IRACING_ID: '/user/iracing-id',
    AVATAR_URL: '/user/avatar-url',
}