import {
  Check,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';
import { Template } from './template.entity';
import { Workout } from './workout.entity';
import { Set } from './set.entity';

@Entity()
@Check(
  `("workoutId" IS NOT NULL AND "templateId" IS NULL) OR ("workoutId" IS NULL AND "templateId" IS NOT NULL)`,
)
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  workout?: Workout | null;

  @ManyToOne(() => Template, (template) => template.workoutExercises, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  template?: Template | null;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises, {
    onDelete: 'CASCADE',
  })
  exercise?: Exercise | null;

  @OneToMany(() => Set, (sets) => sets.workoutExercise, {
    onDelete: 'CASCADE',
  })
  sets!: Set[];

  @Column({ nullable: true })
  notes?: string;

  @Column()
  restTime!: string;
}
