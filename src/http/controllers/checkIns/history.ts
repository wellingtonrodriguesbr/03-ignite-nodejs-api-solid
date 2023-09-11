import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history";

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const historyCheckInsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = historyCheckInsQuerySchema.parse(req.query);

  const checkInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
  const { checkIns } = await checkInsHistoryUseCase.execute({
    page,
    userId: req.user.sub,
  });

  return reply.status(200).send({
    checkIns,
  });
}
