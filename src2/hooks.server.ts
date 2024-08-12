import { authenticateUser } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event,resolve}) => {
    //este punto sucede -> cuando el request llega al server & antes de que la respuesta sea generada
    /* ? 'locals' es un objeto que se genera cuando el request viene al hook
    y de ahi pasa a todos los server side files, cuando el request se va el local tmb
    */
//    event.locals.user = authenticateUser(event);
   // este punto sucede -> renderiza los routes y genera el response
    const response = await resolve(event); 
    // sucede -> se retorna dps de que el response sea generado
    return response;
}