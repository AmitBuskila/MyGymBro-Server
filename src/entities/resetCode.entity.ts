import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ResetCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User, (user) => user.resetCode)
  @JoinColumn()
  user!: User;

  @Column()
  code!: string;

  @Column()
  expiration!: Date;
}
