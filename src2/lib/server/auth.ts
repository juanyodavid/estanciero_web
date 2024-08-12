import type {RequestEvent} from "@sveltejs/kit";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// scrypt is callback based so with promisify we can await it
const scryptAsync = promisify(scrypt);



export const authenticateUser = (event: RequestEvent) => {
    // get the cookies from the request
    const { cookies } = event;

    // get the user token from the cookie
    const userToken = cookies.get('auth');
    console.log("User token is:",userToken);
    // if the user token is not valid, return null
    /*? aca es donde uno checkea el user token en el DB para ver
    si es valido y retornar el user object*/

    // if (userToken === 'regular') {
    //     const user = {
    //         id:
    //     }
    return "este es el user";
}


export class Password {

    static async hashPassword(password: string) {
      const salt = randomBytes(16).toString("hex");
      const buf = (await scryptAsync(password, salt, 64)) as Buffer;
      return `${buf.toString("hex")}.${salt}`;
    }
  
    static async comparePassword(
      storedPassword: string,
      suppliedPassword: string
    ): Promise<boolean> {
      // split() returns array
      const [hashedPassword, salt] = storedPassword.split(".");
      // we need to pass buffer values to timingSafeEqual
      const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
      // we hash the new sign-in password
      const suppliedPasswordBuf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
      // compare the new supplied password with the stored hashed password
      return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
    }
  }