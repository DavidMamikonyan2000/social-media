import { AppDataSource } from "../../config/database.js";
import { UserResponseDto } from "../../dto/user/user-response.dto.js";

export class UserService {
  private userRepository = AppDataSource.getRepository("User");

  async getUserProfile(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const {password, ...profile} = user;
    return profile;
  }

  async updateUserProfile(userId: string, profileData: UserResponseDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, profileData);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUserProfile(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    try {
      await this.userRepository.remove(user);
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}
