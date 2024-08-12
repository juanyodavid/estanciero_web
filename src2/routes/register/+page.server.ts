import { fail, redirect } from '@sveltejs/kit';
import { createUser } from '$lib/db/dbUtils';
import { Password, hashPassword } from '$lib/server/auth';
import { app } from '$lib/db/connection';


/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }: { parent: any }) {
	const { user } = await parent();
	if (user) redirect(307, '/');
}


  
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }: { cookies: any, request: any }) => {
		const data = await request.formData();

        const hashedPassword = await Password.hashPassword(data.get('password'));

		// username: data.get('username'),
		const email =  data.get('email');
		const password= data.get('password'); // Store the hashed password, not the original
        const user = {
            // password: hashedPassword // Store the hashed password, not the original
        };

		await app.emailPasswordAuth.registerUser({ email, password })
		.then((res)=>console.log("usuario creado:",res));

        // const createUserResponse = await createUser(user.email, user.password, user.username);


		// // Handle errors appropriately
		// if (createUserResponse.error) {
		// 	return fail(500, { error: createUserResponse.error }); // Return the error object
		// }

		// // Access the newly created user data (if successful)
		// const newUser = createUserResponse.user;
		// console.log('new user is:',newUser);
		// Use newUser data as needed (e.g., display success message, redirect)

		// const value = btoa(JSON.stringify(newUser));
		// cookies.set('jwt', value, { path: '/' });

		// // Redirect to the login page
		// throw redirect(302, '/');
	}
};