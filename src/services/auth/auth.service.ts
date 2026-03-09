import { AppDataSource } from "../../config/database.js";
import { redisClient } from "../../config/redis.js";
import { UserResponseDto } from "../../dto/user/user-response.dto.js";
import { User } from "../../entities/user.entity.js";
import { ConflictError } from "../../errors/ConflictErrors.js";
import { TokenService } from "../token/token.service.js";

interface AuthResponse {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private tokenService = new TokenService();

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

    const { password: _, ...userSafe } = savedUser;

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateToken(savedUser.id),
      this.tokenService.generateRefreshToken(savedUser.id),
    ]);

    return {
      user: userSafe,
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateToken(user.id),
      this.tokenService.generateRefreshToken(user.id),
    ]);

    const { password: _, ...userSafe } = user;
    return { user: userSafe, accessToken, refreshToken };
  }

  async refreshToken(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const userId = await this.tokenService.verifyRefreshToken(token);
    await this.tokenService.revokeRefreshToken(token);

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateToken(userId),
      this.tokenService.generateRefreshToken(userId),
    ]);

    return { accessToken, refreshToken };
  }

  async logout(userId: string): Promise<void> {
    await redisClient.del(`refreshToken:${userId}`);
  }
}
