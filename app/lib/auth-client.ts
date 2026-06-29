import { createAuthClient } from "better-auth/vue";

//const baseURL = import.meta.env.NUXT_PUBLIC_AUTH_URL || "http://localhost:3000";
//export const authClient = createAuthClient({ baseURL });
export const authClient = createAuthClient();

//export const refetch = (async () => authClient.useSession().refetch);
