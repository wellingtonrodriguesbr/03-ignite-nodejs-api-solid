import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const createCheckInsBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = createCheckInsBodySchema.parse(req.body);
  const { gymId } = createCheckInParamsSchema.parse(req.params);

  const createCheckInUseCase = makeCheckInUseCase();
  await createCheckInUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId: req.user.sub,
  });

  return reply.status(201).send();
}
