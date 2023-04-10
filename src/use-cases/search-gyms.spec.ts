import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCaseUseCase } from "./search-gyms";

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCaseUseCase;

describe("Search Gyms use case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCaseUseCase(gymRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -23.4160128,
      longitude: -47.7462528,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.4160128,
        longitude: -47.7462528,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
