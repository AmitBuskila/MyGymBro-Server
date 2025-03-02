import { Set } from '../entities/set.entity';

export interface AddUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type Entity = {
  id: number;
};

export interface AddTemplateInput {
  name: string;
  description?: string;
  image: string;
  user: Entity;
  sets?: Set[];
}

export interface AddWorkoutInput {
  startDate: string;
  totalTime: number;
  user: Entity;
  sets?: Set[];
}

export interface AddSetInput {
  workout?: Entity;
  template?: Entity;
  exercise: Entity;
  index: number;
  weight: number;
  minReps: number;
  maxReps: number;
  notes?: number;
  restTime: number;
  repsDone?: number;
}
