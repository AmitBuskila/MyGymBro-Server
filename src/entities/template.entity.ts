import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Set } from './set.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @ManyToOne(() => User, (user) => user.workouts, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => Set, (sets) => sets.template, {
    onDelete: 'CASCADE',
  })
  sets!: Set[];
}
