import { createAuthClient } from "better-auth/vue";

const baseURL = "http://localhost:3000";
export const authClient = createAuthClient({ baseURL });
//export const authClient = createAuthClient(); for production

//export const refetch = (async () => authClient.useSession().refetch);
