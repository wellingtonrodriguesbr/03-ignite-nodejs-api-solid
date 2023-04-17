import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms use case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -23.4160128,
      longitude: -47.7462528,
    });

    await gymRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.4160128,
      userLongitude: -47.7462528,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
