export interface UserResponseDto {
  id: string;
  email: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  github?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}
