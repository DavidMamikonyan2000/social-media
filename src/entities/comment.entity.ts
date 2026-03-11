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

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  content!: string;

  @ManyToOne("Post", "comments", { onDelete: "CASCADE" })
  post!: Relation<Post>;

  @Column({ type: "uuid" })
  postId!: string;

  @ManyToOne("User", { onDelete: "CASCADE" })
  author!: Relation<User>;

  @Column({ type: "uuid" })
  authorId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
