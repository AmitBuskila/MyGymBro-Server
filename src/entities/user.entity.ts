import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ResetCode } from './resetCode.entity';
import { Template } from './template.entity';
import { Workout } from './workout.entity';
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

  @OneToMany(() => Template, (templates) => templates.user, {
    onDelete: 'CASCADE',
  })
  templates!: Template[];

  @OneToOne(() => ResetCode, (resetCode) => resetCode.user)
  resetCode!: ResetCode;
}
