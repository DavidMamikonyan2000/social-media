import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

import bcrypt from "bcrypt";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", unique: true })
  username!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", nullable: true })
  bio?: string;

  @Column({ type: "varchar", nullable: true })
  avatarUrl?: string;

  @Column({ type: "varchar", nullable: true })
  coverUrl?: string;

  @Column({ type: "varchar", nullable: true })
  github?: string;

  @Column({ type: "varchar", nullable: true })
  website?: string;

  @Column("text", { array: true, default: [] })
  skills!: string[];

  @Column({ type: "boolean", default: false })
  isPremium!: boolean;

  @Column({ type: "varchar", nullable: true })
  stripeCustomerId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  /*
   * Hash password before insert
   */
  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  /*
   * Compare password method
   */
  async comparePassword(candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
  }
}
