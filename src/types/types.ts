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
  workoutExercises?: addWorkoutExerciseInput[];
}

export interface UpdateTemplateInput {
  name?: string;
  description?: string;
  image?: string;
  workoutExercises?: addWorkoutExerciseInput[];
}

export interface AddWorkoutInput {
  startDate: string;
  totalTime: number;
  user: Entity;
  template?: Entity;
  exercises?: addWorkoutExerciseInput[];
}

export interface addWorkoutExerciseInput {
  workout?: Entity;
  template?: Entity;
  exercise: Entity;
  index: number;
  restTime?: number;
  notes?: number;
  sets: AddSetInput[];
}
export interface AddSetInput {
  workoutExercise: Entity;
  index: number;
  weight: number;
  minReps: number;
  maxReps: number;
  repsDone?: number;
}
