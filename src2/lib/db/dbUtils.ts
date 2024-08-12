import { Password } from '$lib/server/auth';
import { app, commentsCollection, usersCollection } from './connection';
import * as Realm from "realm-web";


export const returnUserList = async () => {
    const filter = { name: { $regex: /Connie/i } }; // Search for names containing 'Connie' (case-insensitive)
    const userList = await usersCollection.find(filter).toArray();
    const serializedUsers = userList.map((item) => 
       JSON.parse(JSON.stringify(item,(key,value) => key === '_id'? 
        value.toString(value) : value)));
    // console.log(serializedUsers);
    return serializedUsers;
}
export const returnComments = async () => {
    const filter = { name: { $regex: /Connie/i } }; // Search for names containing 'Connie' (case-insensitive)
    const commentList = await commentsCollection.find().toArray();
    const serializedUsers = commentList.map((item) => 
       JSON.parse(JSON.stringify(item,(key,value) => key === '_id'? 
        value.toString(value) : value)));
    console.log(serializedUsers);
    return serializedUsers;
}
export const returnUser = async (username:string, password:string) => {
    const filter = { name : username };
    const userList = await usersCollection.find(filter).toArray();
    if (userList.length === 0) return '';
    Password.comparePassword(userList[0].password, password).then((res)=>{
      if (res === true) return "validado";
      else return "falsoo";
    });
    const serializedUsers = userList.map((item) => 
       JSON.parse(JSON.stringify(item,(key,value) => key === '_id'? 
        value.toString(value) : value)));
    // console.log(serializedUsers);
    return serializedUsers;
}

export async function createUser(email: string, password: string, name: string): Promise<any> {
    try {
      const newUser = await usersCollection.insertOne({
        "email": email,
        "password": password,
        "name": name,
      });
  
      return newUser;
    } catch (error: any) {
      console.error('Error creating user:', error);
      // Handle error appropriately (e.g., log to a file, display an error message)
      return { error: error.message }; // Return an error object
    }
  }
  export interface Usuario{
    id: string;
    username: string;
    bio: string | undefined;
    followers: string[] | undefined;
  }
  export interface Comentario{
    nombre: string;
    celular: string | undefined;
    tipo_trabajo: string;
    primer_trabajo: boolean;
    creator: Usuario;
    description: string;
    comment:string;
    createdAt:string | undefined;
    updatedAt:string | undefined;
    tags:string[] | undefined;
    likes:string[] | undefined;
    downs:string[] | undefined;
  }
export async function createComment(Comment:Comentario): Promise<any> {
    try {
      const newComment = await commentsCollection.insertOne({
        ...Comment
      });
      return newComment;
    } catch (error: any) {
      console.error('Error creating comment:', error);
      // Handle error appropriately (e.g., log to a file, display an error message)
      return { error: error.message }; // Return an error object
    }
  }
  export async function loginEmailPassword(email:string, password:string) {
    // Create an email/password credential
    const credentials = Realm.Credentials.emailPassword(email, password);
    console.log("credentials are:", credentials);
    // Authenticate the user
    try {
      const user = await app.logIn(credentials);
      console.log("user is:", user);
      return user;
    }
    catch(err){
      console.error("Error during login:", err);
      const loginError = new Error("Login failed: " + err.errorCode);
      return loginError;
    }
   // Get a list of all Users
   const usuarios = app.allUsers;
    console.log("current user:", app.currentUser)
    // Log out the current user
// await app.currentUser?.logOut().then(()=>console.log("current user after logout:", app.currentUser));

    for (const key in usuarios) {
      const value = usuarios[key];
      console.log(`Clave: ${key}, Valor: ${value}`);
    }
    // app.allUsers.forEach(user => {
    //   console.log(`User with id ${user.id} is ${user.isLoggedIn ? "logged in" : "logged out"}`);
    // });

    // Refresh a user's custom data to make sure we have the latest version
    // await app.currentUser.refreshCustomData().then((res)=>console.log("data about user:",res));
    // console.log('user ahora es:',app.currentUser);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
  
    
  }
  
  