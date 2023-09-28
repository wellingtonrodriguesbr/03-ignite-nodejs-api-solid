import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true });

  const { role } = req.user;

  const token = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    }
  );

  const refreskToken = await reply.jwtSign(
    {
      role,
    },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: "7d",
      },
    }
  );

  reply
    .setCookie("refreshToken", refreskToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
}
