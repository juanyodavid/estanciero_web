import { redirect } from '@sveltejs/kit';
import type { Actions,PageServerLoad } from './$types';
import { loginEmailPassword, returnUser } from '$lib/db/dbUtils';
import { app } from '$lib/db/connection';

export const load = (async ({locals}) => {
    const user =  app.currentUser;
        if (user) redirect(307, '/');
    console.log("user in login: " + user);
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async({cookies,locals,request}) => {
        const data = await request.formData();

        const email= data.get('email');
        const password= data.get('password');
		const user = {
		};
        // const usuario = await loginEmailPassword("juanyodavid019@gmail.com", "aoeuaoeu");
        // const usuario = await loginEmailPassword("f11015128@mail.ntust.edu.tw", "aoeuaoeu");
        console.log("antes de login");
        const usuario = await loginEmailPassword(email, password);
        if (usuario instanceof Error) {
            console.error("Login error:", usuario.message);
            // Handle the error here (e.g., display an error message to the user)
            // throw redirect(401, "/"); // Alternatively, return a specific error response
          }
          
          console.log("Usuario de realm iniciado es:", usuario);
		// const returnedUser = await returnUser(user.username, user.password);
        // console.log(returnedUser);
        // cookies.set("auth","regularToken",{
        //     path: "/",
        //     httpOnly: true,
        //     sameSite: "strict",
        //     secure: process.env.NODE_ENV === "production",
        //     maxAge: 60 * 60 * 24 * 7, // 1 week
        // })
        // throw redirect(303, "/");
    }
}satisfies Actions

