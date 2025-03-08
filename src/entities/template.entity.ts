import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkoutExercise } from './workoutExercise.entity';

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

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercises) => workoutExercises.template,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutExercises!: WorkoutExercise[];
}
