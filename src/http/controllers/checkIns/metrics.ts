import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metrics(req: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await checkInsHistoryUseCase.execute({
    userId: req.user.sub,
  });

  return reply.status(200).send({
    checkInsCount,
  });
}
