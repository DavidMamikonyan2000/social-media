import { AppDataSource } from "../config/database.js";
import { UserResponseDto } from "../dto/user/user-response.dto.js";
import { User } from "../entities/user.entity.js";
import { ConflictError } from "../errors/ConflictErrors.js";
import jwt from "jsonwebtoken";

interface AuthResponse {
  user: UserResponseDto;
  token: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictError("Email is already in use");
    }

    const user = this.userRepository.create({ email, username, password });
    const savedUser = await this.userRepository.save(user);

    const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const { password: _, ...userSafe } = savedUser;
    return {
      user: userSafe,
      token,
    };
  }
}
