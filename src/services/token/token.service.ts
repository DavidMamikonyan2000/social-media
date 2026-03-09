import jwt, { SignOptions } from "jsonwebtoken";
import { redisClient } from "../../config/redis.js";

export class TokenService {
  private secret = process.env.JWT_SECRET!;
  private options: SignOptions = { expiresIn: "1h" };
  private refreshSecret = process.env.JWT_REFRESH_SECRET!;
  private refreshOptions: SignOptions = { expiresIn: "7d" };
  private REFRESH_TTL = 604800; // 7 days in seconds

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, this.options);
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.secret);
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = jwt.sign(
      { userId },
      this.refreshSecret,
      this.refreshOptions,
    );

    // Store refresh token in Redis with TTL
    await redisClient.set(`refreshToken:${refreshToken}`, userId, {
      EX: this.REFRESH_TTL,
    });

    return refreshToken;
  }

  async verifyRefreshToken(token: string): Promise<string> {
    jwt.verify(token, this.refreshSecret);

    const userId = await redisClient.get(`refreshToken:${token}`);
    if (!userId) {
      throw new Error("Invalid refresh token");
    }

    return userId;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await redisClient.del(`refreshToken:${token}`);
  }
}
