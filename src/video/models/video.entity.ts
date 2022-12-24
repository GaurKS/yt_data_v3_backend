import { 
  BaseEntity,
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryGeneratedColumn, 
} from "typeorm";

@Entity()
export class VideoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  query: string;

  @Column()
  video_title: string

  @Column({
    nullable: true
  })
  description: string

  @Column()
  publishedAt: string

  @Column()
  thumbnail: string

  @CreateDateColumn()
  createdAt: Date;
}