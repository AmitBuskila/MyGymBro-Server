import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutExercise } from './workoutExercise.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  image!: string;

  @Column()
  primaryMuscle!: string;

  @Column({ nullable: true })
  secondaryMuscle!: string;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercises) => workoutExercises.exercise,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutExercises!: WorkoutExercise[];
}
