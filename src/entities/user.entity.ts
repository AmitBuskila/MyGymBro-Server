import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Workout } from './workout.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Workout, (workouts) => workouts.user, {
    onDelete: 'CASCADE',
  })
  workouts!: Workout[];
}
