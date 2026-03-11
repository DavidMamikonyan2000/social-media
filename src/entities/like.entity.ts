import type { Post } from "./post.entity.js";
import type { User } from "./user.entity.js";
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  type Relation,
} from "typeorm";

@Entity("likes")
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne("Post", "likes", { onDelete: "CASCADE" })
  post!: Relation<Post>;

  @Column({ type: "uuid" })
  postId!: string;

  @ManyToOne("User", { onDelete: "CASCADE" })
  user!: Relation<User>;

  @Column({ type: "uuid" })
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
