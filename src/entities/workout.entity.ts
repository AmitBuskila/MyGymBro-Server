import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkoutExercise } from './workoutExercise.entity';
import { Template } from './template.entity';

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

  @ManyToOne(() => Template, (template) => template.workouts, {
    onDelete: 'CASCADE',
  })
  template!: Template;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercises) => workoutExercises.workout,
    {
      cascade: ['remove', 'insert'],
      onDelete: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  workoutExercises!: WorkoutExercise[];
}
