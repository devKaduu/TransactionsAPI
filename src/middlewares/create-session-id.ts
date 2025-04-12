import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createSessionId(request: FastifyRequest, response: FastifyReply) {
  let sessionId = request.cookies.sessionId;

  if (!sessionId) {
    sessionId = randomUUID();

    response.cookie("sessionId", sessionId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    request.cookies.sessionId = sessionId;
  }
}
