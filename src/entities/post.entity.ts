import type { User } from "./user.entity.js";
import type { Like } from "./like.entity.js";
import type { Comment } from "./comment.entity.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column("text", { array: true, default: [] })
  images!: string[];

  @ManyToOne("User", "posts", { onDelete: "CASCADE" })
  author!: Relation<User>;

  @Column({ type: "varchar" })
  authorId!: string;

  @OneToMany("Like", "post")
  likes!: Relation<Like[]>;

  @OneToMany("Comment", "post")
  comments!: Relation<Comment[]>;

  @CreateDateColumn()
  createdAt!: Date;
}
