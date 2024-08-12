import { app } from '$lib/db/connection';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const current_user = await app.currentUser;
	if (current_user){
        console.log("locals in /settings is:",current_user);
    } 
    // return {
    //     current_user: JSON.parse(JSON.stringify(current_user))
    // }
    return JSON.parse(JSON.stringify(current_user))
}) satisfies PageServerLoad;

export const actions = {
	logout: async ({ cookies, locals }:{ cookies:any, locals:any }) => {
        await app.currentUser?.logOut().then(()=>console.log("current user after logout:", app.currentUser));

        // console.log("usuario a borrar",locals.user);
		// cookies.delete('jwt', { path: '/' });
		// // cookies.delete('jwt', { path: '/profile' });
		// locals.user = null;
        // console.log("usuario a borrado",locals.user);
        // console.log("All the cookies in /profile after DELETION in profile",cookies.getAll());
        redirect(307, '/');
	}}