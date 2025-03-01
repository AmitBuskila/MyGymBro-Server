import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Set } from './set.entity';

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

  @OneToMany(() => Set, (sets) => sets.template, {
    onDelete: 'CASCADE',
  })
  sets!: Set[];
}
