import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ResetCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.resetCode)
  user!: User;

  @Column()
  code!: string;

  @Column()
  expiration!: Date;
}
