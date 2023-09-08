import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "Wellington",
      email: "wellington2@email.com",
      password: "123456",
    });
    const authResponse = await request(app.server).post("/sessions").send({
      email: "wellington2@email.com",
      password: "123456",
    });

    const { token } = authResponse.body;
    const profile = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profile.statusCode).toEqual(200);
    expect(profile.body.user).toEqual(
      expect.objectContaining({
        email: "wellington2@email.com",
      })
    );
  });
});
