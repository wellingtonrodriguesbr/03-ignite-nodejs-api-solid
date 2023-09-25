import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Nodejs Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    expect(response.statusCode).toEqual(201);
  });
});
