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
export class Workout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  startDate!: Date;

  @Column()
  totalTime!: number;

  @ManyToOne(() => User, (user) => user.workouts, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercises) => workoutExercises.workout,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutExercises!: WorkoutExercise[];
}
