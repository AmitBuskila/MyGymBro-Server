import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';
import { Template } from './template.entity';
import { Workout } from './workout.entity';

@Entity()
@Check(
  `("workoutId" IS NOT NULL AND "templateId" IS NULL) OR ("workoutId" IS NULL AND "templateId" IS NOT NULL)`,
)
export class Set {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Workout, (workout) => workout.sets, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  workout?: Workout | null;

  @ManyToOne(() => Template, (template) => template.sets, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  template?: Template | null;

  @ManyToOne(() => Exercise, (exercise) => exercise.sets, {
    onDelete: 'CASCADE',
  })
  exercise?: Exercise | null;

  @Column()
  index!: number;

  @Column()
  minReps!: number;

  @Column()
  maxReps!: number;

  @Column('decimal', { precision: 6, scale: 2 })
  weight!: number;

  @Column({ nullable: true })
  notes?: string;

  @Column()
  restTime!: string;

  @Column({ nullable: true })
  repsDone?: number;
}
