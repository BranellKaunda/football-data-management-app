import { defineEventHandler, createError } from "h3";
import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  if (event.method === "GET") return;

  if (event.path.startsWith("/api/auth/")) return;

  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
});
