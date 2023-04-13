import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymssUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymssUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymssUseCaseUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymssUseCaseRequest): Promise<FetchNearbyGymssUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
