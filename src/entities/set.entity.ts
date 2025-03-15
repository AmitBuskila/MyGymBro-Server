import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutExercise } from './workoutExercise.entity';

@Entity()
export class Set {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => WorkoutExercise, (workoutExercise) => workoutExercise.sets, {
    onDelete: 'CASCADE',
  })
  workoutExercise!: WorkoutExercise;

  @Column()
  index!: number;

  @Column()
  minReps!: number;

  @Column()
  maxReps!: number;

  @Column('decimal', { precision: 6, scale: 2 })
  weight!: number;

  @Column({ nullable: true })
  repsDone?: number;
}
