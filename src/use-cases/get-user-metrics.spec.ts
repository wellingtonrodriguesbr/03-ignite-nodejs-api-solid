import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics use case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  })

  it("should be able to fetch check-ins history", async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2)

  });

});
