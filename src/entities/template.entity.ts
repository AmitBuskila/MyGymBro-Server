import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkoutExercise } from './workoutExercise.entity';
import { Workout } from './workout.entity';

@Entity()
export class Template {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
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
      cascade: ['remove', 'insert'],
      onDelete: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  workoutExercises!: WorkoutExercise[];

  @OneToMany(() => Workout, (workouts) => workouts.template, {
    onDelete: 'CASCADE',
  })
  workouts!: Workout[];
}
