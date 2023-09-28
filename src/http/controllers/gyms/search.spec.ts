import { createAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "@/app";
import request from "supertest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a gym by title", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Nodejs Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Bun Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: -27.0747279,
        longitude: -49.4889672,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "Nodejs Gym",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Nodejs Gym",
      }),
    ]);
  });
});
